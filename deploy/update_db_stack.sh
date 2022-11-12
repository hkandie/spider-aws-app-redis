#!/bin/sh


aws s3 cp ../aws/db-stack.json s3://rxpowet-bucket-02/cf/db-stack.json


VPCID=`cat ./temp/vpcid`
ACCOUNTID=`cat ./temp/accountid`
SECURITYGROUP1=`cat ./temp/securitygroup1`
SUBNETID01=`cat ./temp/subnetid01`
SUBNETID02=`cat ./temp/subnetid02`
HostedZones=`cat ./temp/HostedZones`
HostedZoneID=`cat ./temp/HostedZoneID`

aws cloudformation update-stack --stack-name rx-powet-db-stack \
--template-url https://rxpowet-bucket-02.s3.amazonaws.com/cf/db-stack.json \
--capabilities CAPABILITY_NAMED_IAM \
--parameters \
ParameterKey=VPC,ParameterValue=${VPCID} \
ParameterKey=HostedZoneName,ParameterValue=${HostedZones} \
ParameterKey=SubnetA,ParameterValue=${SUBNETID01} \
ParameterKey=SubnetB,ParameterValue=${SUBNETID02} \
ParameterKey=VPCSecurityGroups,ParameterValue=${SECURITYGROUP1} \
ParameterKey=DBSnapshotIdentifier,ParameterValue=rx-powet \
ParameterKey=InstanceIdentifier,ParameterValue=rx-powet-dbi \
ParameterKey=DbUsername,ParameterValue=taifa \
ParameterKey=ACCOUNTID,ParameterValue=${ACCOUNTID} >temp/rds.json

aws cloudformation wait stack-update-complete \
    --stack-name rx-powet-db-stack