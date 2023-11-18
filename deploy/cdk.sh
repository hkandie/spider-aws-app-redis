#!/bin/sh

cd deploy

ACCOUNTID=`cat ./temp/accountid`
AWS_VPC_ID=`cat ./temp/vpcid`
AWS_DOMAIN_NAME=`cat ./temp/HostedZones`
AWS_DOMAIN_NAME=`cat ./temp/HostedZones`
AWS_SUBNET_A=`cat ./temp/subnetid01`
AWS_SUBNET_B=`cat ./temp/subnetid02`
export AWS_ACCOUNT=${ACCOUNTID}
export AWS_REGION='us-east-1'
export AWS_DOMAIN_NAME=${AWS_DOMAIN_NAME}
export AWS_VPC_ID=${AWS_VPC_ID}
export AWS_SUBNET_A=${AWS_SUBNET_A}
export AWS_SUBNET_B=${AWS_SUBNET_B}

cd ../cdk
cdk bootstrap
cdk deploy --all --require-approval never
#aws elasticache modify-replication-group \
#--replication-group-id authtestgroup \
#--auth-token This-is-the-rotated-token \
#--auth-token-update-strategy ROTATE \
#--apply-immediately

#aws elasticache describe-events --source-type cache-cluster --duration 1440