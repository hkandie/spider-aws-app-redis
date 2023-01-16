#!/bin/sh

APPVERSION=$1

sh create_app_version.sh ${APPVERSION}
sh create_ecr_repo.sh ${APPVERSION}

aws s3 cp ../aws/template.json s3://rxpowet-bucket-02/cf/template.json

VPCID=`cat ./temp/vpcid`
SECURITYGROUP1=`cat ./temp/securitygroup1`
SUBNETID01=`cat ./temp/subnetid01`
SUBNETID02=`cat ./temp/subnetid02`

aws cloudformation update-stack --stack-name rx-powet-stack \
--template-url https://rxpowet-bucket-02.s3.amazonaws.com/cf/template.json \
--capabilities CAPABILITY_NAMED_IAM \
--parameters \
ParameterKey=AppVersion,ParameterValue=${APPVERSION} \
ParameterKey=VpcId,ParameterValue=${VPCID} \
ParameterKey=SecurityGroup1,ParameterValue=${SECURITYGROUP1} \
ParameterKey=SubnetId01,ParameterValue=${SUBNETID01} \
ParameterKey=SubnetId02,ParameterValue=${SUBNETID02}

aws cloudformation wait stack-update-complete \
    --stack-name rx-powet-stack