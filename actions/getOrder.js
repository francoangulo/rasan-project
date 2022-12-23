require("dotenv").config();
const SQSHelper = require("../config/SQSHelper");
const fs = require("fs");
var chalk = require("chalk");

(async () => {
    const sqs = new SQSHelper();
    const params = {
        QueueUrl:
            "https://sqs.eu-west-1.amazonaws.com/765151898027/QAS_ArgentinaStore_55710?Action=ReceiveMessage&MaxNumberOfMessages=5&VisibilityTimeout=15&AttributeName=All",
    };
    const result = await sqs.receiveMessage(params);
    console.log(result);
    fs.writeFile("pruebaGet.txt", JSON.stringify(result), () => {
        console.log(chalk.bgGreen.bold("\n\n Exported file successfully!"));
    });
})();