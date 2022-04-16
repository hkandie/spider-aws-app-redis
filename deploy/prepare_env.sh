#!/bin/sh

sh create_key_pair.sh > temp/rxKeyPair.pem
sh create_s3_bucket.sh
sh create_secrets.sh > temp/secrets.json
sh vpcid.sh
sh create_db.sh > temp/emrys-rds-01.json
