#!/bin/sh

aws s3 rm s3://rxpowet-bucket-website --recursive

aws cloudformation delete-stack \
    --stack-name rx-powet-website-template-stack

aws cloudformation wait stack-delete-complete \
    --stack-name rx-powet-website-template-stack

aws s3 cp ../aws/website-template.json s3://rxpowet-bucket-03/cf/website-template.json


VPCID=`cat ./temp/vpcid`
ACCOUNTID=`cat ./temp/accountid`
SECURITYGROUP1=`cat ./temp/securitygroup1`
SUBNETID01=`cat ./temp/subnetid01`
SUBNETID02=`cat ./temp/subnetid02`
HostedZones=`cat ./temp/HostedZones`

aws cloudformation create-stack --stack-name rx-powet-website-template-stack \
--template-url https://rxpowet-bucket-03.s3.amazonaws.com/cf/website-template.json \
--capabilities CAPABILITY_NAMED_IAM \
--on-failure DO_NOTHING \
--parameters \
ParameterKey=VPC,ParameterValue=${VPCID} \
ParameterKey=HostedZoneName,ParameterValue=${HostedZones} \
ParameterKey=SubnetA,ParameterValue=${SUBNETID01} \
ParameterKey=SubnetB,ParameterValue=${SUBNETID02} \
ParameterKey=ACCOUNTID,ParameterValue=${ACCOUNTID}

aws cloudformation wait stack-create-complete \
    --stack-name rx-powet-website-template-stack

aws s3 sync ../html/dashboard s3://rxpowet-bucket-website/    