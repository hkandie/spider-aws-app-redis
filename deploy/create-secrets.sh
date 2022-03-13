aws secretsmanager create-secret \
    --name SPIDER/WALKER/FlywayUser \
    --description "My test secret created with the CLI." \
    --secret-string "{\"user\":\"read_only_user\",\"password\":\"P@$$w0rd\"}"