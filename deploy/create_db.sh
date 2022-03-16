#!/bin/sh

SECURITYGROUP1=`cat ./temp/securitygroup1`

#aws rds delete-db-instance \
#--db-instance-identifier emrys-01 \
#--skip-final-snapshot
#
#aws rds wait db-instance-deleted \
#    --db-instance-identifier emrys-01

aws rds create-db-instance \
    --db-instance-identifier emrys-01 \
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
    --db-instance-identifier emrys-01