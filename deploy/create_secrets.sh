export AWS_ACCESS_KEY_ID=`cat temp/.aws_access_key_id`
export AWS_SECRET_ACCESS_KEY=`cat temp/.aws_secret_access_key`
export AWS_DEFAULT_REGION=us-east-1
aws secretsmanager create-secret --name Spider/rx-powet/db-normal-user-secret --description "Normal user secrets." --secret-string file://mycreds.json