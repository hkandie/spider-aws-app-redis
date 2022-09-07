aws secretsmanager create-secret \
    --name Spider/rx-powet/database \
    --description "My test secret created with the CLI." \
    --secret-string "{\"username\":\"taifa\",\"password\":\"Taifa133*\"}"