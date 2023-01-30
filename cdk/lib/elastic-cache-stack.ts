import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as ecs_patterns from 'aws-cdk-lib/aws-ecs-patterns';
import { Construct } from 'constructs';
import { Duration, RemovalPolicy } from 'aws-cdk-lib';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { SecurityGroup } from 'aws-cdk-lib/aws-ec2';
import { aws_elasticache as elasticache } from 'aws-cdk-lib';
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs';

import * as ssm from 'aws-cdk-lib/aws-ssm';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class ElasticCacheStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: any) {
    super(scope, `${id}-dev`, props);

    const vpc = ec2.Vpc.fromLookup(this, `${id}-dev`, { vpcId: props.vpcId });
    const sg = new SecurityGroup(this, `${id}-sg-01`, {
      securityGroupName: `${id}-sg-01`,
      allowAllOutbound: true,
      vpc
    });
    const containerSG1 = SecurityGroup.fromSecurityGroupId(this, 'conntainer-sg-01', 'sg-0832611a1bf013c0b');
    const containerSG2 = SecurityGroup.fromSecurityGroupId(this, 'conntainer-sg-02', 'sg-09e1d468568072b14');
    const port = 6379;
    sg.connections.allowFrom(containerSG1, ec2.Port.tcp(port), 'Ingress SSH from Redis sg 1');
    sg.connections.allowFrom(containerSG2, ec2.Port.tcp(port), 'Ingress SSH from Redis sg 2');

    const logGroup = new LogGroup(this, `${id}-log-group-02`, {
      logGroupName: `${id}-log-group-02`,
      retention: RetentionDays.ONE_DAY,
      removalPolicy: RemovalPolicy.DESTROY
    });

    const subnet_idA = vpc.selectSubnets().subnetIds[0]
    const subnet_idB = vpc.selectSubnets().subnetIds[1];
    

    const cfnSubnetGroup = new elasticache.CfnSubnetGroup(this, 'MyCfnSubnetGroup', {
      description: 'description',
      subnetIds: [subnet_idA,subnet_idB],
      cacheSubnetGroupName: `${id}-subnet-group-name-01`,
      tags: [{
        key: 'key',
        value: 'value',
      }],
    });
    

    const cfnReplicationGroup = new elasticache.CfnReplicationGroup(this, 'RXElasticacheRedisCluster', {
      replicationGroupDescription: 'RX Elasticache Redis Cluster',
    
      // the properties below are optional
      authToken: "Milk1234Milk1234Milk1234Milk1234<?",
      atRestEncryptionEnabled: true,
      transitEncryptionEnabled: true,
      automaticFailoverEnabled: false,
      autoMinorVersionUpgrade: false,
      cacheNodeType: 'cache.t2.micro',
      cacheSubnetGroupName: cfnSubnetGroup.cacheSubnetGroupName,
      dataTieringEnabled: false,
      engine: 'redis',
      engineVersion: '7.0',
      logDeliveryConfigurations: [{
        destinationDetails: {
          cloudWatchLogsDetails: {
            logGroup: logGroup.logGroupName,
          },
        },
        destinationType: 'cloudwatch-logs',
        logFormat: 'text',
        logType: 'slow-log',
      },
      {
        destinationDetails: {
          cloudWatchLogsDetails: {
            logGroup: logGroup.logGroupName,
          },
        },
        destinationType: 'cloudwatch-logs',
        logFormat: 'text',
        logType: 'engine-log',
      }],
      multiAzEnabled: false,
      numCacheClusters: 1,
      port,
      securityGroupIds: [sg.securityGroupId],
      tags: [{
        key: 'key',
        value: 'value',
      }],
    });
    
    new ssm.StringParameter(this, 'rx-endpoint', {
      allowedPattern: '.*',
      description: 'The value Foo',
      parameterName: 'rx-endpoint',
      stringValue: cfnReplicationGroup.attrPrimaryEndPointAddress,
      tier: ssm.ParameterTier.STANDARD,
    });
    
    new ssm.StringParameter(this, 'rx-port', {
      allowedPattern: '.*',
      description: 'The value Foo',
      parameterName: 'rx-port',
      stringValue: `${port}`,
      tier: ssm.ParameterTier.STANDARD,
    });

  }
}
