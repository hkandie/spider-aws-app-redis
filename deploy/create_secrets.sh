aws secretsmanager create-secret \
    --name Spider/rx-powet/db-superuser-user-secret \
    --description "Super user secrets." \
    --secret-string "{\"superuser\":\"taifa\",\"password\":\"Taifa133*\"}"

aws secretsmanager create-secret \
    --name Spider/rx-powet/db-normal-user-secret \
    --description "Normal user secrets." \
    --secret-string "{\"dbuser\":\"taifa-01\",\"password\":\"Taifa133*\"}"
