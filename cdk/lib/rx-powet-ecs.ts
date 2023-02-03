import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as ecs_patterns from 'aws-cdk-lib/aws-ecs-patterns';
import * as route53 from 'aws-cdk-lib/aws-route53';
import { Construct } from 'constructs';
import { Duration } from 'aws-cdk-lib';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { SecurityGroup, Subnet, SubnetFilter } from 'aws-cdk-lib/aws-ec2';
import { LogGroup } from 'aws-cdk-lib/aws-logs';
import { ApplicationProtocol } from 'aws-cdk-lib/aws-elasticloadbalancingv2';

export class EcsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: any) {
    super(scope, `${id}-dev`, props);

    const vpc = ec2.Vpc.fromLookup(this, `${id}-dev`, { 
      vpcId: props.vpcId      
    });
    const zone =route53.HostedZone.fromLookup(this, 'MyZone', {
      domainName: props.domainName,
    });

    const cluster = new ecs.Cluster(this, `${id}-cluster`, {
      vpc: vpc,
      clusterName: `${id}-cluster`
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
      logGroupName: `${id}-log-group-01`
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
        logGroup: logGroup ,
      }),
      portMappings: [{
          containerPort: 8443
         } ]
    });
    // Create a load-balanced Fargate service and make it public
    const service = new ecs_patterns.ApplicationLoadBalancedFargateService(this, `${id}-fargate-service`, {
      cluster: cluster, // Required
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
      securityGroups: []
    });
       

    service.targetGroup.configureHealthCheck({
      enabled: true,
      healthyThresholdCount: 2,
      interval: Duration.seconds(30),
      path: '/actuator/health',
    });
    service.loadBalancer.addSecurityGroup(loadBalancerSG);
    container.node.
  }
}
