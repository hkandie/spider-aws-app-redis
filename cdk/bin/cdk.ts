#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ApiGateWayStack } from '../lib/api-gateway-stack';
import { EcsStack } from '../lib/rx-powet-ecs';
import { RxLambdaStack } from '../lib/rx-powet-lambda-stack';
import { DynamoDBStack } from '../lib/rx-powet-dynamo-db';

const app = new cdk.App();
const vpcId = process.env.AWS_VPC_ID;
const account = process.env.AWS_ACCOUNT;
const domainName = process.env.AWS_DOMAIN_NAME;
const subnetA = process.env.AWS_SUBNET_A;
const subnetB = process.env.AWS_SUBNET_B;
console.log(`Deploying to ${process.env.AWS_DOMAIN_NAME}`);
// new DynamoDBStack(app, 'rx-powet-ecs-cluster-stack', {
//   env: { account: account, region: 'us-east-1' },
//   vpcId, domainName,subnetA,subnetB, domainPrefix: 'v1'
// });
// new EcsStack(app, 'rx-powet-ecs-cluster-stack', {
//   env: { account: account, region: 'us-east-1' },
//   vpcId, domainName,subnetA,subnetB, domainPrefix: 'v1'
// });

// new EcsStack(app, 'rx-powet-ecs-cluster-stack-dr', {
//   env: { account: account, region: 'us-east-1' },
//   vpcId, domainName,subnetA,subnetB, domainPrefix: 'v2'
// });

// //  new ElasticCacheStack(app, 'rx-powet-redis-stack', {
// //    env: { account: account, region: 'us-east-1' },
// //    vpcId
// //  });

// new ApiGateWayStack(app, 'rx-powet-api-gateway-stack', {
//   env: { account: account, region: 'us-east-1' },
//   vpcId
// });
// new RxLambdaStack(app, 'rx-powet-lambda-stack', {
//   env: { account: account, region: 'us-east-1' },
//   tags: {
//     name: 'rx-powet'
//   }
// });