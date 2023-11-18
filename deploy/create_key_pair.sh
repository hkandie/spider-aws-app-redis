#!/bin/sh

#aws ec2 create-key-pair --key-name rxKeyPair > temp/rxKeyPair.pem
key_name=$1
keytool -delete -storepass asgfdgfgfgf -alias server -keystore ${key_name}.jks | true
keytool -genkey -alias server -keyalg RSA -keypass asgfdgfgfgf -storepass asgfdgfgfgf -keysize 2048 -keystore ${key_name}.jks -dname "CN=[Common Name], OU=[organisationunit], O=[organisation], L=[town/city], ST=[state/province], C=[GB]" &> /dev/null
mv ${key_name}.jks temp/
#echo $?