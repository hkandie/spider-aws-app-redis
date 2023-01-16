#aws secretsmanager create-secret \
#    --name RX/my-team/rx-powet/client \
#    --description "My test secret created with the CLI." \
#    --secret-string "{\"user\":\"diegor\",\"password\":\"EXAMPLE-PASSWORD\"}" \
#	--tags "[{\"Key\":\"CostCenter\",\"Value\":\"12345\"},{\"Key\":\"environment\",\"Value\":\"production\"}]"
	



aws secretsmanager update-secret \
    --secret-id RX/my-team/rx-powet/client \
    --description "My test secret created with the CLI." \
	--name RX/my-team/rxpowet/client \
    --secret-string "{\"user\":\"diegor\",\"password\":\"ROTATED-PASSWORD\"}" 
	

aws secretsmanager tag-resource \
    --secret-id RX/my-team/rxpowet/client \
    --tags '[{"Key": "CostCenter", "Value": "T24"}, {"Key": "environment", "Value": "prod"}]'