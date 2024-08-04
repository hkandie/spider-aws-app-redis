#!/bin/sh
rm -rf temp/*
mkdir temp
b

aws route53 list-hosted-zones > temp/list-hosted-zones.json
aws ec2 describe-subnets > temp/subnets.json
aws ec2 describe-security-groups > temp/security-groups.json

python3 vpc.py

SECURITYGROUP1=`cat ./temp/securitygroup1`

aws ec2 authorize-security-group-ingress \
    --group-id "${SECURITYGROUP1}" \
    --protocol tcp \
    --port 443 \
    --cidr 0.0.0.0/0




