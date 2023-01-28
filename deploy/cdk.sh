#!/bin/sh

cd deploy

ACCOUNTID=`cat ./temp/accountid`
AWS_VPC_ID=`cat ./temp/vpcid`
echo ${ACCOUNTID}
export AWS_ACCOUNT=${ACCOUNTID}
export AWS_REGION='us-east-1'
export AWS_VPC_ID=${AWS_VPC_ID}

cd ../cdk
# cdk bootstrap
cdk deploy --all --require-approval never