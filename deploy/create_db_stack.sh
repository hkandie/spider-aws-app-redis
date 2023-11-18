#!/bin/sh

aws cloudformation delete-stack \
    --stack-name rx-powet-db-stack

aws cloudformation wait stack-delete-complete \
    --stack-name rx-powet-db-stack

aws s3 cp ../aws/db-stack.json s3://rxpowet-bucket-01/cf/db-stack.json


VPCID=`cat ./temp/vpcid`
ACCOUNTID=`cat ./temp/accountid`
SECURITYGROUP1=`cat ./temp/securitygroup1`
SUBNETID01=`cat ./temp/subnetid01`
SUBNETID02=`cat ./temp/subnetid02`
HostedZones=`cat ./temp/HostedZones`

aws cloudformation create-stack --stack-name rx-powet-db-stack \
--template-url https://rxpowet-bucket-01.s3.amazonaws.com/cf/db-stack.json \
--capabilities CAPABILITY_NAMED_IAM \
--on-failure DO_NOTHING \
--parameters \
ParameterKey=VPC,ParameterValue=${VPCID} \
ParameterKey=HostedZoneName,ParameterValue=${HostedZones} \
ParameterKey=SubnetA,ParameterValue=${SUBNETID01} \
ParameterKey=SubnetB,ParameterValue=${SUBNETID02} \
ParameterKey=VPCSecurityGroups,ParameterValue=${SECURITYGROUP1} \
ParameterKey=DBSnapshotIdentifier,ParameterValue=rx-powet \
ParameterKey=InstanceIdentifier,ParameterValue=rx-powet-db \
ParameterKey=DbUsername,ParameterValue=taifa \
ParameterKey=ACCOUNTID,ParameterValue=${ACCOUNTID} >temp/rds.json

aws cloudformation wait stack-create-complete \
    --stack-name rx-powet-db-stack