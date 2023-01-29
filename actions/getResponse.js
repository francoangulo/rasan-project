import * as dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.ENVIRONMENT}` });
import { ReceiveMessageCommand } from "@aws-sdk/client-sqs";
import { sqsClient } from "../config/SQSClient.js";
import fs from "fs";
import chalk from "chalk";
import { getOrderNumber } from "../utils/getOrderNumber.js";

const SQS_PARAMS = {
  QueueUrl: process.env.GET_RESPONSE,
};

// TODO: Check this code and cover the possible error cases. Then optimize the code with better practices
(async () => {
  try {
    const result = await sqsClient.send(new ReceiveMessageCommand(SQS_PARAMS));
    console.log({ result });
    const bodyMessage = result.Messages ? result.Messages[0].Body : false;
    const orderNumber = bodyMessage
      ? getOrderNumber(result.Messages[0].Body)
      : "no-order";
    ensureFoldersExist();
    saveJson(result, orderNumber);
    saveXml(bodyMessage, orderNumber);
  } catch (error) {
    console.log(
      `${chalk.bgHex("#ff0000").hex("#ffffff")(
        "  SE PRODUJO UN ERROR EN LA PETICIÓN:  "
      )} ${error}`
    );
  }
})();

const ensureFoldersExist = () => {
  try {
    !fs.existsSync("./orders_json") && fs.mkdirSync("./orders_json");
    !fs.existsSync("./orders_xml") && fs.mkdirSync("./orders_xml");
  } catch (err) {
    console.error(err);
  }
};

const saveJson = (result, orderNumber) => {
  const requestId = result && result.$metadata && result.$metadata.requestId;
  const fileName =
    orderNumber === "no-order"
      ? `orders_json/no-${requestId}.json`
      : `orders_json/eorder-${orderNumber}.json`;
  try {
    fs.existsSync("./orders_json") &&
      fs.writeFile(fileName, JSON.stringify(result), () => {
        orderNumber === "no-order"
          ? console.log(chalk.bgHex("#FBBF2C").bold("\n\n No order found!"))
          : console.log(
              chalk
                .bgHex("#23BB33")
                .bold(
                  `\n\n Saved new ${chalk
                    .bgHex("#FBBF2C")
                    .bold("JSON")} order!  ---> ${orderNumber}`
                )
            );
      });
  } catch (error) {
    console.log(error);
  }
};

const saveXml = (bodyMessage, orderNumber) => {
  if (orderNumber === "no-order") return;
  try {
    fs.existsSync("./orders_xml") &&
      fs.writeFile(
        `orders_xml/eorder-${orderNumber}.xml`,
        JSON.stringify(bodyMessage),
        () => {
          orderNumber === "no-order"
            ? console.log(chalk.bgHex("#FBBF2C").bold("\n\n No order found!"))
            : console.log(
                chalk
                  .bgHex("#23BB33")
                  .bold(
                    `\n\n Saved new ${chalk
                      .bgHex("#fc4c3d")
                      .bold("XML")} order!  ---> ${orderNumber}`
                  )
              );
        }
      );
  } catch (error) {
    console.log(error);
  }
};
