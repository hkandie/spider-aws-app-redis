#!/bin/sh
test=`date +%s%N`
testnum=${#test} 

AppVersion=${test:0:$testnum-6}  

 
aws s3 cp ../aws/rx-redis-template.json s3://rxpowet-bucket-02/cf/rx-redis-template.json

VPCID=`cat ./temp/vpcid`
SECURITYGROUP1=`cat ./temp/securitygroup1`
SUBNETID01=`cat ./temp/subnetid01`
SUBNETID02=`cat ./temp/subnetid02`
HostedZoneIdParameter=`cat ./temp/HostedZoneIdParameter`

aws cloudformation update-stack --stack-name rx-redis-stack \
--template-url https://rxpowet-bucket-02.s3.amazonaws.com/cf/rx-redis-template.json \
--capabilities CAPABILITY_NAMED_IAM \
--parameters \
ParameterKey=AppVersion,ParameterValue=${AppVersion} \
ParameterKey=VpcId,ParameterValue=${VPCID} \
ParameterKey=SecurityGroup1,ParameterValue=${SECURITYGROUP1} \
ParameterKey=HostedZoneIdParameter,ParameterValue=${HostedZoneIdParameter} \
ParameterKey=SubnetId01,ParameterValue=${SUBNETID01} \
ParameterKey=SubnetId02,ParameterValue=${SUBNETID02}

aws cloudformation wait stack-update-complete \
    --stack-name rx-redis-stack