#!/bin/sh


export AWS_ACCESS_KEY_ID=`cat temp/.aws_access_key_id`
export AWS_SECRET_ACCESS_KEY=`cat temp/.aws_secret_access_key`
export AWS_DEFAULT_REGION=us-east-1

aws s3 cp ../aws/db-stack.json s3://rxpowet-bucket-03/cf/db-stack.json


VPCID=`cat ./temp/vpcid`
ACCOUNTID=`cat ./temp/accountid`
SECURITYGROUP1=`cat ./temp/securitygroup1`
SUBNETID01=`cat ./temp/subnetid01`
SUBNETID02=`cat ./temp/subnetid02`
HostedZones=`cat ./temp/HostedZones`

aws cloudformation update-stack --stack-name rx-powet-db-stack \
--template-url https://rxpowet-bucket-03.s3.amazonaws.com/cf/db-stack.json \
--capabilities CAPABILITY_NAMED_IAM \
--parameters \
ParameterKey=SubnetA,ParameterValue=${SUBNETID01} \
ParameterKey=SubnetB,ParameterValue=${SUBNETID02} \
ParameterKey=VPCSecurityGroups,ParameterValue=${SECURITYGROUP1} \
ParameterKey=InstanceIdentifier,ParameterValue=rx-powet-db \
ParameterKey=DbUsername,ParameterValue=taifa 

aws cloudformation wait stack-update-complete \
    --stack-name rx-powet-db-stack