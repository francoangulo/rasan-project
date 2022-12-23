require("dotenv").config();
const SQSHelper = require("../config/SQSHelper");

(async () => {
    const sqs = new SQSHelper();
    const params = {
        QueueUrl:
            "https://sqs.eu-west-1.amazonaws.com/765151898027/QAS_ArgentinaStore_55710",
        AttributeNames: ["All"],
    };
    console.log(await sqs.getQueueAttributes(params));
})();
