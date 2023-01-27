#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { EcsStack } from '../lib/cdk-stack';
import { ElasticCacheStack } from '../lib/elastic-cache-stack';
import { ApiGateWayStack } from '../lib/api-gateway-stack';

const app = new cdk.App();
const vpcId= 'vpc-0314c7e213d823c1d';
const account= '051367950628';
new EcsStack(app, 'rx-powet-stack', {
   env: { account: account, region: 'us-east-1'},
   vpcId

});
new ElasticCacheStack(app, 'rx-powet-redis-stack', {
  env: { account: account, region: 'us-east-1' },
  vpcId
});

// new ApiGateWayStack(app, 'rx-powet-redis-stack', {
//   env: { account: account, region: 'us-east-1' },
//   vpcId
// });