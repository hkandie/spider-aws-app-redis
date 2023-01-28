import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as ecs_patterns from 'aws-cdk-lib/aws-ecs-patterns';
import { Construct } from 'constructs';
import { Duration } from 'aws-cdk-lib';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { SecurityGroup } from 'aws-cdk-lib/aws-ec2';
import { LogGroup } from 'aws-cdk-lib/aws-logs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class EcsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: any) {
    super(scope, `${id}-dev`, props);

    const vpc = ec2.Vpc.fromLookup(this, `${id}-dev`, { vpcId: props.vpcId });

    const cluster = new ecs.Cluster(this, "MyCluster", {
      vpc: vpc,
      clusterName: `${id}-cluster`
    });
    const repository = ecr.Repository.fromRepositoryName(this, `${id}-erc-repo`, 'spider-walker/emrys');
   
    const sg = new SecurityGroup(this, `${id}-sg-01`, {
      securityGroupName: `${id}-sg-01`,
      allowAllOutbound: true,
      vpc
    });
    const fargateTaskDefinition = new ecs.FargateTaskDefinition(this, 'TaskDef', {
      memoryLimitMiB: 512,
      cpu: 256,
    });
    
    
    const container = fargateTaskDefinition.addContainer("rx-powet-container", {
      image: ecs.ContainerImage.fromEcrRepository(repository),
      environment: {
        env: 'prod',
        SPRING_PROFILE: 'prod'
      },
      portMappings: [{
          containerPort: 8443
         } ]
    });
    // Create a load-balanced Fargate service and make it public
    const service = new ecs_patterns.ApplicationLoadBalancedFargateService(this, "MyFargateService", {
      cluster: cluster, // Required
      cpu: 512, // Default is 256
      desiredCount: 1, // Default is 1
      memoryLimitMiB: 2048, // Default is 512
      publicLoadBalancer: false, // Default is false
      assignPublicIp: true,    
      securityGroups: [sg],
      taskDefinition: fargateTaskDefinition,
      loadBalancerName: 'rx-alb'
    });

    service.targetGroup.configureHealthCheck({
      enabled: true,
      healthyThresholdCount: 2,
      interval: Duration.seconds(30),
      path: '/actuator/health',
    });
    

  }
}
