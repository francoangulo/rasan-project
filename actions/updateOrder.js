require("dotenv").config({ path: `.env.${process.env.ENVIRONMENT}` });
const SQSHelper = require("../config/SQSHelper");
var chalk = require("chalk");

(async () => {
  const sqs = new SQSHelper();
  const params = {
    QueueUrl: process.env.UPDATE_ORDER,
    MessageBody:
      "%3C%3Fxml%20version%3D%271.0%27%20encoding%3D%27UTF-8%27%3F%3E%0A%3COrderUpdates%3E%0A%3COrderStatus%3E%0A%3CSellerId%3E50110%3C%2FSellerId%3E%20%0A%3CStorefront%3EArgentinaStore%3C%2FStorefront%3E%0A%3COrderNumber%3E5902149%3C%2FOrderNumber%3E%20%0A%3CStatus%3EDelivered%3C%2FStatus%3E%20%0A%3CEZDOrderNumber%3E12345%3C%2FEZDOrderNumber%3E%20%0A%3C%2FOrderStatus%3E%0A%3C%2FOrderUpdates%3E%0A",
  };
  console.log({ params });
  try {
    console.log(await sqs.sendMessage(params));
    console.log(chalk.bgGreen("\n\n Orden actualizada con éxito"));
  } catch (error) {
    console.log(chalk.bgRed("\n" + error));
  }
})();
