import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import path = require("path");
import { ArnFormat } from "aws-cdk-lib";

export class RxLambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: cdk.StackProps) {
    const domainName = process.env.AWS_DOMAIN_NAME;
    super(scope, id);

    const bucket = new s3.Bucket(this, "rx-powet-b-bucket", { bucketName: 'rx-powet-b-bucket' });
    const zone = route53.HostedZone.fromLookup(this, 'MyZone', {
      domainName: `${domainName}.`,
    });
    const certificate = new acm.Certificate(this, 'Certificate', {
      domainName: `api.${domainName}`,
      certificateName: 'Hello World Service', // Optionally provide an certificate name
      validation: acm.CertificateValidation.fromDns(zone),
    });

    const handler = new lambda.Function(this, "rx-powet-b-lambda", {
      functionName: 'rx-powet-b',
      runtime: lambda.Runtime.NODEJS_14_X, // So we can use async in widget.js
      code: lambda.Code.fromAsset(path.join(__dirname, '../../lambda-handler')),
      handler: "index.handler",
      environment: {
        BUCKET: bucket.bucketName,
        SOME: this.splitArn(bucket.bucketArn, ArnFormat.SLASH_RESOURCE_NAME).resource
      }
    });

    bucket.grantReadWrite(handler); // was: handler.role);

    const api = new apigateway.RestApi(this, "rx-powet-b-api", {
      restApiName: "Widget Service",
      description: "This service serves widgets."
    });
    api.addDomainName("", {
      certificate: certificate,
      domainName: `api.${domainName}.`,

    })
    const getWidgetsIntegration = new apigateway.LambdaIntegration(handler, {
      requestTemplates: { "application/json": '{ "statusCode": "200" }' }
    });

    api.root.addMethod("GET", getWidgetsIntegration);
  }
}