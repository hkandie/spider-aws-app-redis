#!/bin/sh

cd deploy

ACCOUNTID=`cat ./temp/accountid`
AWS_VPC_ID=`cat ./temp/vpcid`
export AWS_ACCOUNT=${ACCOUNTID}
export AWS_REGION='us-east-1'
export AWS_VPC_ID=${AWS_VPC_ID}

cd ../cdk
# cdk bootstrap
cdk deploy --all --require-approval never

#aws elasticache describe-events --source-type cache-cluster --duration 1440