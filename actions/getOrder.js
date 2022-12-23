require("dotenv").config({ path: `.env.${process.env.ENVIRONMENT}` });
const SQSHelper = require("../config/SQSHelper");
const fs = require("fs");
var chalk = require("chalk");

console.log({ ENDPOINT: process.env.GET_ORDER });
(async () => {
  const sqs = new SQSHelper();
  const params = {
    QueueUrl: process.env.GET_ORDER,
    Action: "ReceiveMessage",
  };
  const result = await sqs.receiveMessage(params);
  console.log(result);
  fs.writeFile("pruebaGet.json", JSON.stringify(result), () => {
    console.log(chalk.bgGreen.bold("\n\n Exported file successfully!"));
  });
})();
