#!/bin/sh

export AWS_ACCESS_KEY_ID=`cat temp/.aws_access_key_id`
export AWS_SECRET_ACCESS_KEY=`cat temp/.aws_secret_access_key`
export AWS_DEFAULT_REGION=us-east-1

SECURITYGROUP1=`cat ./temp/securitygroup1`

#aws rds delete-db-instance \
#--db-instance-identifier emrys-rds-01 \
#--skip-final-snapshot
#
#aws rds wait db-instance-deleted \
#    --db-instance-identifier emrys-rds-01

aws rds create-db-instance \
    --db-instance-identifier emrys-rds-01 \
    --db-name taifa \
    --db-instance-class db.t2.micro \
    --engine postgres \
    --master-username taifa \
    --master-user-password taifa123* \
    --allocated-storage 20 \
    --vpc-security-group-ids "${SECURITYGROUP1}" \
    --backup-retention-period 0 \
    --engine-version 11

aws rds wait db-instance-available \
    --db-instance-identifier emrys-rds-01