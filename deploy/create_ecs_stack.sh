#!/bin/sh


aws cloudformation delete-stack \
    --stack-name rx-powet-ecs-stack

aws cloudformation wait stack-delete-complete \
    --stack-name rx-powet-ecs-stack

aws s3 cp ../aws/ecs-template.json s3://rxpowet-bucket-01/cf/ecs-template.json


VPCID=`cat ./temp/vpcid`
ACCOUNTID=`cat ./temp/accountid`
SECURITYGROUP1=`cat ./temp/securitygroup1`
SUBNETID01=`cat ./temp/subnetid01`
SUBNETID02=`cat ./temp/subnetid02`

aws cloudformation create-stack --stack-name rx-powet-ecs-stack \
--template-url https://rxpowet-bucket-01.s3.amazonaws.com/cf/ecs-template.json \
--capabilities CAPABILITY_NAMED_IAM \
--on-failure DO_NOTHING \
--parameters \
ParameterKey=AppVersion,ParameterValue=0.0.4 \
ParameterKey=VpcId,ParameterValue=${VPCID} \
ParameterKey=SecurityGroup1,ParameterValue=${SECURITYGROUP1} \
ParameterKey=SubnetId01,ParameterValue=${SUBNETID01} \
ParameterKey=SubnetId02,ParameterValue=${SUBNETID02} \
ParameterKey=ACCOUNTID,ParameterValue=${ACCOUNTID}

aws cloudformation wait stack-create-complete \
    --stack-name rx-powet-ecs-stack