#!/bin/sh

aws s3 cp ../aws/website-template.json s3://rxpowet-bucket-03/cf/website-template.json

VPCID=`cat ./temp/vpcid`
ACCOUNTID=`cat ./temp/accountid`
SECURITYGROUP1=`cat ./temp/securitygroup1`
SUBNETID01=`cat ./temp/subnetid01`
SUBNETID02=`cat ./temp/subnetid02`
HostedZones=`cat ./temp/HostedZones`

aws cloudformation update-stack --stack-name rx-powet-website-template-stack \
--template-url https://rxpowet-bucket-03.s3.amazonaws.com/cf/website-template.json \
--capabilities CAPABILITY_NAMED_IAM \
--parameters \
ParameterKey=VPC,ParameterValue=${VPCID} \
ParameterKey=SubnetA,ParameterValue=${SUBNETID01} \
ParameterKey=HostedZoneName,ParameterValue=${HostedZones} \
ParameterKey=SubnetB,ParameterValue=${SUBNETID02} \
ParameterKey=ACCOUNTID,ParameterValue=${ACCOUNTID}

aws cloudformation wait stack-update-complete \
    --stack-name rx-powet-website-template-stack

sh website_deploy.sh