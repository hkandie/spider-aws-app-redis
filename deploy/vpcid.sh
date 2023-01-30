#!/bin/sh
rm -rf ./temp/*
mkdir temp
aws route53 list-hosted-zones > temp/list-hosted-zones.json
aws ec2 describe-subnets > temp/subnets.json
aws ec2 describe-security-groups > temp/security-groups.json

py vpc.py

SECURITYGROUP1=`cat ./temp/securitygroup1`

aws ec2 authorize-security-group-ingress \
    --group-id "${SECURITYGROUP1}" \
    --protocol tcp \
    --port 80 \
    --cidr 0.0.0.0/0




