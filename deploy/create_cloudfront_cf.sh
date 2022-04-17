#!/bin/sh

aws cloudformation delete-stack \
    --stack-name rx-powet-cloudfront-stack

aws cloudformation wait stack-delete-complete \
    --stack-name rx-powet-cloudfront-stack

aws s3 cp ../aws/cloudfront-template.json s3://rxpowet-bucket-03/cf/cloudfront-template.json


VPCID=`cat ./temp/vpcid`
ACCOUNTID=`cat ./temp/accountid`
SECURITYGROUP1=`cat ./temp/securitygroup1`
SUBNETID01=`cat ./temp/subnetid01`
SUBNETID02=`cat ./temp/subnetid02`
HostedZones=`cat ./temp/HostedZones`

aws cloudformation create-stack --stack-name rx-powet-cloudfront-template-stack \
--template-url https://rxpowet-bucket-03.s3.amazonaws.com/cf/cloudfront-template.json \
--capabilities CAPABILITY_NAMED_IAM \
--on-failure DO_NOTHING \
--parameters \
ParameterKey=VPC,ParameterValue=${VPCID} \
ParameterKey=HostedZoneName,ParameterValue=${HostedZones} \
ParameterKey=SubnetA,ParameterValue=${SUBNETID01} \
ParameterKey=SubnetB,ParameterValue=${SUBNETID02} \
ParameterKey=ACCOUNTID,ParameterValue=${ACCOUNTID}

aws cloudformation wait stack-create-complete \
    --stack-name rx-powet-cloudfront-template-stack

aws s3 cp ../html/dashboard s3://rxpowet-bucket-front/   