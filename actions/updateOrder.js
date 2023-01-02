import * as dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.ENVIRONMENT}` });
import { SendMessageCommand } from "@aws-sdk/client-sqs";
import { sqsClient } from "../config/SQSClient.js";
import chalk from "chalk";
const SQS_PARAMS = {
  QueueUrl: process.env.UPDATE_ORDER,
};

(async () => {
  SQS_PARAMS.MessageBody =
    "%3C%3Fxml%20version%3D%271.0%27%20encoding%3D%27UTF-8%27%3F%3E%0A%3COrderUpdates%3E%0A%3COrderStatus%3E%0A%3CSellerId%3E55710%3C%2FSellerId%3E%20%0A%3CStorefront%3EArgentinaStore%3C%2FStorefront%3E%0A%3COrderNumber%3E5902149%3C%2FOrderNumber%3E%20%0A%3CStatus%3EDelivered%3C%2FStatus%3E%20%0A%3CEZDOrderNumber%3E12345%3C%2FEZDOrderNumber%3E%20%0A%3C%2FOrderStatus%3E%0A%3C%2FOrderUpdates%3E%0A";
  try {
    console.log(await sqsClient.send(new SendMessageCommand(SQS_PARAMS)));
    console.log(
      chalk.bgHex("#23BB33").bold("\n\n Orden actualizada con éxito")
    );
  } catch (error) {
    console.log(chalk.bgRed("\n" + error));
  }
})();
