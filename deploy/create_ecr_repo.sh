#!/bin/sh

ACCOUNTID=`cat ./temp/accountid`
VERSION=0.0.5
cd ../
./mvnw compile jib:dockerBuild

aws ecr create-repository \
    --repository-name spider-walker/emrys \
    --image-tag-mutability MUTABLE

aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${ACCOUNTID}.dkr.ecr.us-east-1.amazonaws.com

docker tag spider-walker/emrys:${VERSION} ${ACCOUNTID}.dkr.ecr.us-east-1.amazonaws.com/spider-walker/emrys:${VERSION}
docker tag spider-walker/emrys:latest ${ACCOUNTID}.dkr.ecr.us-east-1.amazonaws.com/spider-walker/emrys:latest

docker push ${ACCOUNTID}.dkr.ecr.us-east-1.amazonaws.com/spider-walker/emrys:${VERSION}
docker push ${ACCOUNTID}.dkr.ecr.us-east-1.amazonaws.com/spider-walker/emrys:latest

aws ecs update-service --cluster rx-powet-ecs-cluster-stack-cluster --service rx-powet-ecs-cluster-stack-service --force-new-deployment