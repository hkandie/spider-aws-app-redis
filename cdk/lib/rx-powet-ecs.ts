import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as ecs_patterns from 'aws-cdk-lib/aws-ecs-patterns';
import * as route53 from 'aws-cdk-lib/aws-route53';
import { Construct } from 'constructs';
import { Duration, RemovalPolicy } from 'aws-cdk-lib';
import { SecurityGroup } from 'aws-cdk-lib/aws-ec2';
import { LogGroup } from 'aws-cdk-lib/aws-logs';
import { ApplicationProtocol } from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { Alarm, Color, Dashboard, GraphWidget, Metric, TreatMissingData, Stats, Unit, ComparisonOperator } from 'aws-cdk-lib/aws-cloudwatch';
import * as sns from 'aws-cdk-lib/aws-sns';
import { SnsAction } from 'aws-cdk-lib/aws-cloudwatch-actions';
import * as subscriptions from 'aws-cdk-lib/aws-sns-subscriptions';
import { Queue } from 'aws-cdk-lib/aws-sqs';

export class EcsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: any) {
    super(scope, `${id}-dev`, props);
    const clusterName = `${id}-cluster`
    const serviceName = `${id}-service`
    const vpc = ec2.Vpc.fromLookup(this, `${id}-dev`, {
      vpcId: props.vpcId
    });
    const zone = route53.HostedZone.fromLookup(this, 'MyZone', {
      domainName: props.domainName,
    });

    const cluster = new ecs.Cluster(this, `${id}-cluster`, {
      vpc: vpc,
      clusterName
    });
    const repository = ecr.Repository.fromRepositoryName(this, `${id}-erc-repo`, 'spider-walker/emrys');

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
      portMappings: [{
        containerPort: 8443
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
      loadBalancerName: 'rx-ecs-elb',
      circuitBreaker: {
        rollback: true
      },
      maxHealthyPercent: 200,
      minHealthyPercent: 100,
      domainName: `ecs.${props.domainName}`,
      domainZone: zone,
      securityGroups: [],
    });
    // loadBalancedFargateService.targetGroup.setAttribute('targetGroupName', 'rx-ecs-target')

    loadBalancedFargateService.targetGroup.configureHealthCheck({
      enabled: true,
      healthyThresholdCount: 2,
      interval: Duration.seconds(30),
      path: '/actuator/health',
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

    const topic = new sns.Topic(this, 'NotifyHigh', {
      topicName: 'Notify-Topic-High',
      displayName: "Notify-Topic-High"
    });

    const queue = new Queue(this, 'NotifyHighQueue', {
      queueName: 'Notify-Topic-High-Queue'
    }); 
    const metric = new Metric(
     {
      namespace: 'AWS/ApplicationELB',
      metricName:"HTTPCode_ELB_5XX_Count",
      dimensionsMap:{
          "LoadBalancerName": loadBalancedFargateService.loadBalancer.loadBalancerArn
      },
      
      statistic:Stats.SAMPLE_COUNT,
      period: Duration.seconds(60),
    })

    const alarm = new Alarm(
      this , 
      "MyCloudWatchAlarm",
      {metric,
      threshold: 1,
      evaluationPeriods:1,
      comparisonOperator: ComparisonOperator.GREATER_THAN_THRESHOLD,
      alarmDescription: "Alarm triggered when 5xx errors occur",
      treatMissingData: TreatMissingData.NOT_BREACHING
    }
  )
    
    alarm.addAlarmAction(new SnsAction(topic));
    topic.addSubscription(new subscriptions.SqsSubscription(queue))

  }
 

}
