#!/bin/sh

ACCOUNTID=`cat ./temp/accountid`
VERSION=0.0.3
cd ../
source  build-container.sh
docker build -t spider-walker/emrys:${VERSION} -t spider-walker/emrys:latest

aws ecr create-repository \
    --repository-name spider-walker/emrys \
    --image-tag-mutability MUTABLE

aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${ACCOUNTID}.dkr.ecr.us-east-1.amazonaws.com

docker tag spider-walker/emrys:${VERSION} ${ACCOUNTID}.dkr.ecr.us-east-1.amazonaws.com/spider-walker/emrys:${VERSION}
docker tag spider-walker/emrys:latest ${ACCOUNTID}.dkr.ecr.us-east-1.amazonaws.com/spider-walker/emrys:latest

docker push ${ACCOUNTID}.dkr.ecr.us-east-1.amazonaws.com/spider-walker/emrys:${VERSION}
docker push ${ACCOUNTID}.dkr.ecr.us-east-1.amazonaws.com/spider-walker/emrys:latest