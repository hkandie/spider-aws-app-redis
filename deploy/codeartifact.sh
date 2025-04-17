export AWS_ACCESS_KEY_ID=`cat temp/.aws_access_key_id`
export AWS_SECRET_ACCESS_KEY=`cat temp/.aws_secret_access_key`
export AWS_DEFAULT_REGION=us-east-1

echo "Creating CodeArtifact domain and repository"

# # Create a domain

aws codeartifact create-domain --domain spider-walker
aws codeartifact create-repository \
    --domain spider-walker \
    --domain-owner 767397833358 \
    --repository spider-walker-01 \
    --description "This is a spider-walker-01 repository."

aws codeartifact create-repository \
    --domain spider-walker \
    --domain-owner 767397833358 \
    --repository spider-walker-02 \
    --description "This is a spider-walker-02 repository."    


aws codeartifact associate-external-connection \
    --repository spider-walker-02 \
    --domain spider-walker \
    --external-connection public:npmjs

# # Create an IAM role and policy for sharing
# # aws iam create-role --role-name CodeArtifactAccessRole
# # aws iam attach-role-policy --role-name CodeArtifactAccessRole --policy-arn arn:aws:iam::aws:policy/AmazonCodeArtifactFullAccess

# # Share the domain using RAM
# # aws ram create-resource-share --name CodeArtifactDomainShare --cli-input-json file://share.json
