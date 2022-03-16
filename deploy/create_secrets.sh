aws secretsmanager create-secret \
    --name SPIDER/WALKER/FWSECRETS/ \
    --description "My test secret created with the CLI." \
    --secret-string "{\"username\":\"AR_READ_ONLY_USER\",\"password\":\"P@$$w0rd\"}"