#!/bin/sh

aws elasticbeanstalk create-application \
--application-name test-application \

aws elasticbeanstalk create-environment \
 --application-name test-application \
 --environment-name test-env \
 --solution-stack-name  "64bit Amazon Linux 2 v5.4.8 running Node.js 14" \
 --option-settings \
 ResourceName=string,Namespace=aws:autoscaling:launchconfiguration,OptionName=IamInstanceProfile,Value=aws-elasticbeanstalk-ec2-role