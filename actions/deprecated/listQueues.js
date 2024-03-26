require("dotenv").config();
const SQSHelper = require("../../config/SQSHelper");

(async () => {
  const sqs = new SQSHelper();
  const urls = await (await sqs.listQueues()).QueueUrls;
  const filtered = urls.filter((url) => url.includes("55710"));
  console.log(filtered);
})();
