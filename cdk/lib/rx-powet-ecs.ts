import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as ecs_patterns from 'aws-cdk-lib/aws-ecs-patterns';
import * as route53 from 'aws-cdk-lib/aws-route53';
import { Construct } from 'constructs';
import { Duration, Fn, RemovalPolicy } from 'aws-cdk-lib';
import { SecurityGroup } from 'aws-cdk-lib/aws-ec2';
import { LogGroup } from 'aws-cdk-lib/aws-logs';
import { ApplicationProtocol, HttpCodeElb, HttpCodeTarget, Protocol } from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { Alarm, Metric, TreatMissingData, Stats, ComparisonOperator } from 'aws-cdk-lib/aws-cloudwatch';
import * as sns from 'aws-cdk-lib/aws-sns';
import { SnsAction } from 'aws-cdk-lib/aws-cloudwatch-actions';
import * as subscriptions from 'aws-cdk-lib/aws-sns-subscriptions';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import { Queue } from 'aws-cdk-lib/aws-sqs';

export class EcsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: any) {
    super(scope, `${id}-dev`, props);
    const clusterName = `${id}-cluster`
    const serviceName = `${id}-service`
    const containerPort = 8443;
    const vpc = ec2.Vpc.fromLookup(this, `${id}-dev`, {
      vpcId: props.vpcId
    });
    const appDomainName = `ecs-${props.domainPrefix}.${props.domainName}`;
    const zone = route53.HostedZone.fromLookup(this, `${id}-MyZone`, {
      domainName: `${props.domainName}.`,
    });

    const cluster = new ecs.Cluster(this, `${id}-cluster`, {
      vpc: vpc,
      clusterName
    });
    const repository = ecr.Repository.fromRepositoryName(this, `${id}-erc-repo`, 'spider-walker/emrys');


    const certificate = new acm.Certificate(this, 'Certificate', {
      domainName: `ecs.${props.domainName}`,
      certificateName: 'Hello World Service', // Optionally provide an certificate name
      validation: acm.CertificateValidation.fromDns(zone),
    });


    const loadBalancerSG = new SecurityGroup(this, `${id}-lb-security-group`, {
      allowAllOutbound: true,
      vpc
    });
    const fargateTaskDefinition = new ecs.FargateTaskDefinition(this, `${id}-task-definition`, {
      memoryLimitMiB: 512,
      cpu: 256,
    });
    const logGroup = new LogGroup(this, `${id}-log-group-01`, {
      logGroupName: `${id}-log-group-01`,
      removalPolicy: RemovalPolicy.DESTROY
    });

    const container = fargateTaskDefinition.addContainer("rx-powet-container", {
      image: ecs.ContainerImage.fromEcrRepository(repository),
      environment: {
        SPRING_PROFILES_ACTIVE: 'dev',
        REDIS_PASSWORD: 'Milk1234Milk1234Milk1234Milk1234<?',
        REDIS_HOST: 'master.rxr8bldylsoeh3p.zqlpfa.use1.cache.amazonaws.com'
      },
      logging: ecs.LogDrivers.awsLogs({
        streamPrefix: 'rxpowet',
        logGroup: logGroup,
      }),
      healthCheck: {
        interval: Duration.seconds(60),
        retries: 3,
        command: ["CMD-SHELL", `curl -f -k https://localhost:8443/person/10000/health || exit 1`]
      },
      portMappings: [{
        containerPort
      }]
    });
    // Create a load-balanced Fargate service and make it public
    const loadBalancedFargateService = new ecs_patterns.ApplicationLoadBalancedFargateService(this, `${id}-fargate-service`, {
      cluster, // Required
      serviceName,
      cpu: 512, // Default is 256
      desiredCount: 1, // Default is 1
      memoryLimitMiB: 2048, // Default is 512
      publicLoadBalancer: true, // Default is false
      assignPublicIp: true,
      taskDefinition: fargateTaskDefinition,
      targetProtocol: ApplicationProtocol.HTTPS,
      protocol: ApplicationProtocol.HTTPS,
      loadBalancerName: `${props.domainPrefix}-rx-ecs-elb`,
      circuitBreaker: {
        rollback: true
      },
      certificate: certificate,
      // sslPolicy: SslPolicy.RECOMMENDED,
      maxHealthyPercent: 200,
      minHealthyPercent: 100,
      domainName: `${appDomainName}.`,
      domainZone: zone,
      securityGroups: [],
    });
    // loadBalancedFargateService.targetGroup.setAttribute('targetGroupFullName', 'rx-ecs-target')
    loadBalancedFargateService.targetGroup.configureHealthCheck({
      protocol: Protocol.HTTPS,
      enabled: true,
      healthyThresholdCount: 5,
      interval: Duration.seconds(60),
      path: '/person/5/health',
    });

    const scaling = loadBalancedFargateService.service.autoScaleTaskCount({ maxCapacity: 10 });
    scaling.scaleOnCpuUtilization('CpuScaling', {
      policyName: 'Tracking ECSServiceAverageCPUUtilization at 75',
      targetUtilizationPercent: 75,
    });

    scaling.scaleOnMemoryUtilization('MemoryUtilization', {
      policyName: 'Tracking MemoryUtilization at 50',
      targetUtilizationPercent: 50,
    });

    scaling.scaleOnRequestCount('RequestScaling', {
      policyName: 'Tracking ALBRequestCountPerTarget at 10000',
      requestsPerTarget: 10000,
      targetGroup: loadBalancedFargateService.targetGroup,
    });

    const topic = new sns.Topic(this, `${id}-NotifyHigh`, {
      topicName: `Notify-Topic-High-${props.domainPrefix}`,
      displayName: "Notify-Topic-High"
    });


    const metric5xx = new Metric(
      {
        namespace: 'AWS/ApplicationELB',
        metricName: HttpCodeTarget.TARGET_5XX_COUNT,
        dimensionsMap: {
          "LoadBalancer": loadBalancedFargateService.loadBalancer.loadBalancerFullName
        },

        statistic: Stats.SAMPLE_COUNT,
        period: Duration.seconds(60),
      })

    const alarm5xx = new Alarm(
      this,
      `${id}-Alarm-5xx`,
      {
        metric: metric5xx,
        threshold: 1,
        evaluationPeriods: 1,
        comparisonOperator: ComparisonOperator.GREATER_THAN_THRESHOLD,
        alarmDescription: "Alarm triggered when 5xx errors occur",
        treatMissingData: TreatMissingData.NOT_BREACHING
      }
    )

    const metric4xx = new Metric(
      {
        namespace: 'AWS/ApplicationELB',
        metricName: HttpCodeTarget.TARGET_4XX_COUNT,
        dimensionsMap: {
          "LoadBalancer": loadBalancedFargateService.loadBalancer.loadBalancerFullName
        },

        statistic: Stats.SAMPLE_COUNT,
        period: Duration.seconds(60),
      })

    const alarm4xx = new Alarm(
      this,
      `${id}-Alarm-4xx`,
      {
        metric: metric4xx,
        threshold: 1,
        evaluationPeriods: 1,
        comparisonOperator: ComparisonOperator.GREATER_THAN_THRESHOLD,
        alarmDescription: "Alarm triggered when 4xx errors occur",
        treatMissingData: TreatMissingData.NOT_BREACHING
      }
    )

    alarm5xx.addAlarmAction(new SnsAction(topic));
    alarm4xx.addAlarmAction(new SnsAction(topic));

    topic.addSubscription(new subscriptions.EmailSubscription("zeddarn@gmail.com"))

    if (props.domainPrefix == 'v1') {
      const healthCheck = new route53.CfnHealthCheck(this, `${props.domainPrefix}HealthCheck`, {

        healthCheckConfig: {
          type: "HTTPS",
          fullyQualifiedDomainName: appDomainName,
          port: 443,
          resourcePath: `/person/2222/health`,
        }
      });
      // const dnsRecord = new route53.ARecord(this, `${id}-ARecord`, {
      //   zone,
      //   target: route53.RecordTarget.fromValues(`ecs.${props.domainName}`)
      // });

      // const failover = new route53.CfnRecordSet(this, `CnameApiRecord`, {
      //   hostedZoneId: zone.hostedZoneId,
      //   failover: `ecs.${props.domainName}`,
      //   type: appDomainName,
      //   name: 'ecs'
      // });

    }

  }


}
