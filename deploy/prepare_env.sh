#!/bin/sh
#sh vpcid.sh
#sh create_key_pair.sh > temp/rxKeyPair.pem
#sh create_s3_bucket.sh
#sh create_secrets.sh > temp/secrets.json

ACCOUNTID=`cat ./temp/accountid`
AWS_VPC_ID=`cat ./temp/vpcid`
echo ${ACCOUNTID}
export AWS_ACCOUNT=${ACCOUNTID}
export AWS_REGION='us-east-1'
export AWS_VPC_ID=${AWS_VPC_ID}