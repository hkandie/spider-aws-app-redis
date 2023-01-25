#!/bin/sh

VERSION=0.0.3
./mvnw clean package
docker build -t spider-walker/emrys:${VERSION} -t spider-walker/emrys:latest .