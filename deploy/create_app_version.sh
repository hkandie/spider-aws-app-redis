#!/bin/sh

mkdir deployments

APPVERSION=$1
EB_APP="RxPowet"
DESCRIPTION="RxPowet Is theapp"

APP_VER_NAME="${EB_APP}"-"${APPVERSION}".zip
S3_BUCKET=rxpowet-bucket-02
S3_KEY=apps/deployments/"${APP_VER_NAME}"
ACCOUNTID=`cat ./temp/accountid`

cd deployments
rm -vrf .* * 2>&-

cp ../../apps/Dockerrun.aws.json .
cp -r ../../apps/.ebextensions .

sed -i "s/ACCOUNTID/$ACCOUNTID/" ./Dockerrun.aws.json

zip -r -D "${APP_VER_NAME}" .

aws s3 rm s3://"${S3_BUCKET}"/"${S3_KEY}"
aws s3 cp ./${APP_VER_NAME} s3://"${S3_BUCKET}"/"${S3_KEY}"
