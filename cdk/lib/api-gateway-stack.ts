import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
import * as apigatewayv2 from 'aws-cdk-lib/aws-apigateway';
import { IntegrationType, MockIntegration } from 'aws-cdk-lib/aws-apigateway';
import { type } from 'os';

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class ApiGateWayStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: any) {
    super(scope, `${id}-dev`, props);

    const vpc = ec2.Vpc.fromLookup(this, `${id}-vpc`, { vpcId: props.vpcId });
    const api = new apigatewayv2.RestApi(this, 'books-api');
    const integration = new apigatewayv2.Integration(
      { type: IntegrationType.MOCK });
    const json = {
      app: 'json',
      statusCode: 200
    };


    api.root.addMethod('GET', integration).addMethodResponse({
      statusCode: '200'
    });
    api.root.addProxy

  }
}
