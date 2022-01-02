#!/bin/sh

sh vpcid.sh
sh create_key_pair.sh > temp/rxKeyPair.pem
sh create_s3_bucket.sh
sh create_app_version.sh 1
sh create_db.sh > temp/emrys-01.json