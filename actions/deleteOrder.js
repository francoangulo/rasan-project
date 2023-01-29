import * as dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.ENVIRONMENT}` });
import { SendMessageCommand } from "@aws-sdk/client-sqs";
import { sqsClient } from "../config/SQSClient.js";
import chalk from "chalk";
const SQS_PARAMS = {
  QueueUrl: process.env.DELETE_ORDER,
};

(async () => {
  // !This is the Receipt Handle obtained in the action of getOrder. It must go encoded
  SQS_PARAMS.ReceiptHandle = "XXXX";
  try {
    console.log(await sqsClient.send(new SendMessageCommand(SQS_PARAMS)));
    console.log(chalk.bgHex("#23BB33").bold("\n\n Orden eliminada con éxito"));
  } catch (error) {
    console.log(chalk.bgRed("\n" + error));
  }
})();

// <?xml version='1.0' encoding='UTF-8'?>
// <OrderUpdates>
// <OrderStatus>
// <SellerId>50110</SellerId>
// <Storefront>ArgentinaStore</Storefront>
// <OrderNumber>1620358</OrderNumber>
// <Status>Delivered</Status>
// <EZDOrderNumber>12345</EZDOrderNumber>
// </OrderStatus>
// </OrderUpdates>
