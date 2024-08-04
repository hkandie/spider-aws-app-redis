#!/bin/sh

export AWS_ACCESS_KEY_ID=`cat temp/.aws_access_key_id`
export AWS_SECRET_ACCESS_KEY=`cat temp/.aws_secret_access_key`
export AWS_DEFAULT_REGION=us-east-1

sh vpcid.sh
sh create_s3_bucket.sh
# sh create_secrets.sh > temp/secrets.json

