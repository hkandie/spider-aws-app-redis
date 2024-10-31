#!/bin/sh

AppVersion=$1

mkdir deployments

cd deployments
rm -vrf .* * 2>&-

cp ../../lambda/index.js .

zip -r -D RxLamdba-${AppVersion}.zip .
 
aws s3 cp ./RxLamdba-${AppVersion}.zip s3://rxpowet-bucket-03/apps/deployments/RxLamdba-${AppVersion}.zip
