require("dotenv").config({ path: `.env.${process.env.ENVIRONMENT}` });
const SQSHelper = require("../config/SQSHelper");
const fs = require("fs");
var chalk = require("chalk");
console.log({ ENV: process.env.REGION });
(async () => {
  const sqs = new SQSHelper();
  const params = {
    QueueUrl: process.env.RECEIVE_MESSAGE,
    AttributeName: ["All"],
  };
  const result = await sqs.receiveMessage(params);
  console.log(result);
  fs.writeFile("prueba.txt", JSON.stringify(result), () => {
    console.log(chalk.bgGreen.bold("\n\n Exported file successfully!"));
  });
})();
