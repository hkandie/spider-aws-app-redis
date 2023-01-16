#!/bin/sh
AppVersion=1 



aws s3 cp ../aws/rx-redis-template.json s3://rxpowet-bucket-02/cf/rx-redis-template.json

aws cloudformation delete-stack \
    --stack-name rx-redis-stack

aws cloudformation wait stack-delete-complete \
    --stack-name rx-redis-stack


VPCID=`cat ./temp/vpcid`
SECURITYGROUP1=`cat ./temp/securitygroup1`
SUBNETID01=`cat ./temp/subnetid01`
SUBNETID02=`cat ./temp/subnetid02`

aws cloudformation create-stack --stack-name rx-redis-stack \
--template-url https://rxpowet-bucket-02.s3.amazonaws.com/cf/rx-redis-template.json \
--on-failure DO_NOTHING \
--capabilities CAPABILITY_NAMED_IAM \
--parameters \
ParameterKey=VpcId,ParameterValue=${VPCID} \
ParameterKey=SecurityGroup1,ParameterValue=${SECURITYGROUP1} \
ParameterKey=SubnetId01,ParameterValue=${SUBNETID01} \
ParameterKey=SubnetId02,ParameterValue=${SUBNETID02}

aws cloudformation wait stack-create-complete \
    --stack-name rx-redis-stack