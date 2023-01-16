#!/bin/sh

COMMIT_SHA=$1
DEPLOY_ENV=$2
EB_APP=$3
S3_BUCKET_NAME=jd-us01

CURRENT_ARTIFACT_NAME="${EB_APP}"-"${COMMIT_SHA}".zip
cd $EB_DIR || exit 1

sed -i "s/CONTAINER_TAG/$COMMIT_SHA/" Dockerrun.aws.json

zip -r "${CURRENT_ARTIFACT_NAME}" .
aws --region us-east-1 s3 cp \
"${CURRENT_ARTIFACT_NAME}" \
s3://"${S3_BUCKET_NAME}"/b2b/eb-deployments/"${CURRENT_ARTIFACT_NAME}" \
--sse