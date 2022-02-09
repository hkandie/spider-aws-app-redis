console.log("Loading function");
var AWS = require("aws-sdk");

exports.handler = function(event, context) {
    var eventText = JSON.stringify(event, null, 2);
    console.log("Received event:", eventText);
    var sns = new AWS.SNS();
    var params = {
        Message: eventText, 
        Subject: "Test SNS From Lambda",
        TopicArn: "arn:aws:sns:us-east-1:609641038973:Rx-LowImpaired-AnotherAccount"
    };
    sns.publish(params, context.done);
};