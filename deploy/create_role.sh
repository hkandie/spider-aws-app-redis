#!/bin/sh
cp ../aw
#aws iam delete-role --role-name rx_ec2_instance_profile
#
#aws iam create-role --role-name rx_eb_instance_profile \
#--assume-role-policy-document  file://./rx-powet-policy.json \
#--description "Allows Elastic Beanstalk to create and manage AWS resources on your behalf."