#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ElasticCacheStack } from '../lib/elastic-cache-stack';
import { ApiGateWayStack } from '../lib/api-gateway-stack';
import { EcsStack } from '../lib/rx-powet-ecs';
import { RxAppRunnerStack } from '../lib/rx-powet-app-runner';

const app = new cdk.App();
const vpcId = process.env.AWS_VPC_ID;
const account = process.env.AWS_ACCOUNT;
const domainName = process.env.AWS_DOMAIN_NAME;
const subnetA = process.env.AWS_SUBNET_A;
const subnetB = process.env.AWS_SUBNET_B;
console.log(`Deploying to ${process.env.AWS_DOMAIN_NAME}`);
new EcsStack(app, 'rx-powet-ecs-cluster-stack', {
  env: { account: account, region: 'us-east-1' },
  vpcId, domainName,subnetA,subnetB
});
//  new ElasticCacheStack(app, 'rx-powet-redis-stack', {
//    env: { account: account, region: 'us-east-1' },
//    vpcId
//  });
//  new RxAppRunnerStack(app, 'rx-powet-app-runner-stack', {
//   env: { account: account, region: 'us-east-1' },
//   vpcId, domainName,subnetA,subnetB
// });

// new ApiGateWayStack(app, 'rx-powet-redis-stack', {
//   env: { account: account, region: 'us-east-1' },
//   vpcId
// });