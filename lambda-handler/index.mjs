export const handler = async(event) => {
    console.log("Loading function");
    const response = {
        statusCode: 200,       
        body: JSON.stringify({
            Message: event, 
            Subject: "Test SNS From Lambda",
            TopicArn: "arn:aws:sns:us-east-1:609641038973:Rx-LowImpaired-AnotherAccount",
        }, null, 2),
    };
    return response;
};
