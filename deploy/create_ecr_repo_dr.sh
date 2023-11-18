#!/bin/sh

ACCOUNTID=`cat ./temp/accountid`
export aws AWS_REGION=`us-west-1`
VERSION=0.0.5
cd ../
./mvnw compile jib:dockerBuild

aws ecr create-repository \
    --repository-name spider-walker/emrys \
    --image-tag-mutability MUTABLE

aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${ACCOUNTID}.dkr.ecr.${AWS_REGION}.amazonaws.com

docker tag spider-walker/emrys:${VERSION} ${ACCOUNTID}.dkr.ecr.${AWS_REGION}.amazonaws.com/spider-walker/emrys:${VERSION}
docker tag spider-walker/emrys:latest ${ACCOUNTID}.dkr.ecr.${AWS_REGION}.amazonaws.com/spider-walker/emrys:latest

docker push ${ACCOUNTID}.dkr.ecr.${AWS_REGION}.amazonaws.com/spider-walker/emrys:${VERSION}
docker push ${ACCOUNTID}.dkr.ecr.${AWS_REGION}.amazonaws.com/spider-walker/emrys:latest

aws ecs update-service --cluster rx-powet-ecs-cluster-stack-cluster --service rx-powet-ecs-cluster-stack-service --force-new-deployment