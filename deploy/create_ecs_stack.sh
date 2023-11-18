#!/bin/sh

aws s3 rm s3://rxpowet-bucket-01-logs --recursive

aws cloudformation delete-stack \
    --stack-name rx-powet-ecs-stack

aws cloudformation wait stack-delete-complete \
    --stack-name rx-powet-ecs-stack

aws s3 cp ../aws/ecs-fargate.json s3://rxpowet-bucket-01/cf/ecs-fargate.json


VPCID=`cat ./temp/vpcid`
ACCOUNTID=`cat ./temp/accountid`
SECURITYGROUP1=`cat ./temp/securitygroup1`
SUBNETID01=`cat ./temp/subnetid01`
SUBNETID02=`cat ./temp/subnetid02`
HostedZones=`cat ./temp/HostedZones`

aws cloudformation create-stack --stack-name rx-powet-ecs-stack \
--template-url https://rxpowet-bucket-01.s3.amazonaws.com/cf/ecs-fargate.json \
--capabilities CAPABILITY_NAMED_IAM \
--on-failure DO_NOTHING \
--parameters \
ParameterKey=AppVersion,ParameterValue=0.0.5 \
ParameterKey=VPC,ParameterValue=${VPCID} \
ParameterKey=HostedZoneName,ParameterValue=${HostedZones} \
ParameterKey=SubnetA,ParameterValue=${SUBNETID01} \
ParameterKey=SubnetB,ParameterValue=${SUBNETID02} \
ParameterKey=ACCOUNTID,ParameterValue=${ACCOUNTID}

aws cloudformation wait stack-create-complete \
    --stack-name rx-powet-ecs-stack