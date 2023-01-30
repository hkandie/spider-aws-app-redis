import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as route53 from 'aws-cdk-lib/aws-route53';
import { Construct } from 'constructs';
import * as apprunner from 'aws-cdk-lib/aws-apprunner';


export class RxAppRunnerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: any) {
    super(scope, `${id}-dev`, props);

    const vpc = ec2.Vpc.fromLookup(this, `${id}-dev`, { 
      vpcId: props.vpcId      
    });
    const zone =route53.HostedZone.fromLookup(this, 'MyZone', {
      domainName: props.domainName,
    });
    new apprunner.CfnService(this, 'Service', {
      sourceConfiguration:{
        
      }
    });
    
    

  }
}
