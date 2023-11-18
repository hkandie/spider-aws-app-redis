import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as kinesis from "aws-cdk-lib/aws-kinesis";
import { RemovalPolicy } from "aws-cdk-lib";

export class DynamoDBStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: any) {
    super(scope, id);

    const stream = new kinesis.Stream(this, 'Stream');

    const table = new dynamodb.Table(this, 'Table', {
      tableName: 'PersonTable',
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING
      },
      sortKey: {
        name: 'timestamp',
        type: dynamodb.AttributeType.STRING
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      tableClass: dynamodb.TableClass.STANDARD,
      kinesisStream: stream,
      removalPolicy: RemovalPolicy.DESTROY
    });

  }
}