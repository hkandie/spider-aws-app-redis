#!/bin/sh
export AWS_ACCESS_KEY_ID=`cat temp/.aws_access_key_id`
export AWS_SECRET_ACCESS_KEY=`cat temp/.aws_secret_access_key`
export AWS_DEFAULT_REGION=us-east-1

# aws s3 rm s3://rxpowet-bucket-03-logs --recursive

# aws cloudformation delete-stack \
#     --stack-name rx-powet-code-deploy-stack

# aws cloudformation wait stack-delete-complete \
#     --stack-name rx-powet-code-deploy-stack

aws s3 cp ../aws/code-deploy.json s3://rxpowet-bucket-03/cf/code-deploy.json


VPCID=`cat ./temp/vpcid`
ACCOUNTID=`cat ./temp/accountid`
SECURITYGROUP1=`cat ./temp/securitygroup1`
SUBNETID01=`cat ./temp/subnetid01`
SUBNETID02=`cat ./temp/subnetid02`
HostedZones=`cat ./temp/HostedZones`

aws cloudformation create-stack --stack-name rx-powet-code-deploy-stack \
--template-url https://rxpowet-bucket-03.s3.amazonaws.com/cf/code-deploy.json \
--capabilities CAPABILITY_NAMED_IAM \
--on-failure DO_NOTHING \
# --parameters \
# ParameterKey=AppVersion,ParameterValue=0.0.5 \
# ParameterKey=VPC,ParameterValue=${VPCID} \
# ParameterKey=HostedZoneName,ParameterValue=${HostedZones} \
# ParameterKey=SubnetA,ParameterValue=${SUBNETID01} \
# ParameterKey=SubnetB,ParameterValue=${SUBNETID02} \
# ParameterKey=ACCOUNTID,ParameterValue=${ACCOUNTID}

aws cloudformation wait stack-create-complete \
    --stack-name rx-powet-code-deploy-stack