import * as dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.ENVIRONMENT}` });
import { ReceiveMessageCommand } from "@aws-sdk/client-sqs";
import { sqsClient } from "../config/SQSClient.js";
import fs from "fs";
import chalk from "chalk";
import { getOrderNumber } from "../utils/getOrderNumber.js";

(async () => {
  const params = {
    QueueUrl: process.env.GET_ORDER,
    Action: "ReceiveMessage",
  };
  const result = await sqsClient.send(new ReceiveMessageCommand(params));
  const orderNumber = result.Messages
    ? getOrderNumber(result.Messages[0].Body)
    : "no-order";
  fs.writeFile(`${orderNumber}.json`, JSON.stringify(result), () => {
    orderNumber === "no-order"
      ? console.log(chalk.bgYellow.bold("\n\n No order found!"))
      : console.log(
          chalk.bgGreen.bold(`\n\n Saved new order!  ---> ${orderNumber}`)
        );
  });
})();
