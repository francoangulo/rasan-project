require("dotenv").config({ path: `.env.${process.env.ENVIRONMENT}` });
const SQSHelper = require("../config/SQSHelper");
const fs = require("fs");
var chalk = require("chalk");

(async () => {
  const sqs = new SQSHelper();
  const params = {
    QueueUrl: process.env.GET_ORDER,
    Action: "ReceiveMessage",
  };
  const result = await sqs.receiveMessage(params);
  const orderNumber = result.Messages
    ? getOrderNumber(result.Messages[0].Body)
    : "no-order";
  fs.writeFile(`${orderNumber}.json`, JSON.stringify(result), () => {
    console.log(chalk.bgGreen.bold("\n\n Exported file successfully!"));
  });
})();

const getOrderNumber = (body) => {
  const start =
    String(body).lastIndexOf("<OrderNumber>") + "<OrderNumber>".length;
  const end = String(body).lastIndexOf("</OrderNumber>");
  const newName = String(body).substring(start, end);
  return newName;
};
