require("dotenv").config();
const SQSHelper = require("../config/SQSHelper");
const fs = require("fs");
var chalk = require("chalk");

module.exports = {
    listQueues: async function (data, done) {
        const sqs = new SQSHelper();
        const urls = await (await sqs.listQueues()).QueueUrls;
        const filtered = urls.filter((url) => url.includes("55710"));
        const type = urls.map((url) => typeof url);
        done(filtered);
    },
    getAttributes: async function (data, done) {
        const sqs = new SQSHelper();
        const params = {
            QueueUrl:
                "https://sqs.eu-west-1.amazonaws.com/765151898027/QAS_ArgentinaStore_55710",
            AttributeNames: ["All"],
        };
        done(await sqs.getQueueAttributes(params));
    },
    receiveMessage: async function (data, done) {
        const sqs = new SQSHelper();
        const params = {
            QueueUrl:
                "https://sqs.eu-west-1.amazonaws.com/765151898027/QAS_ArgentinaStore_55710_ResponsesFromSalesforce",
            AttributeName: ["All"],
        };
        const result = await sqs.receiveMessage(params);
        console.log(result);
        fs.writeFile("prueba.txt", JSON.stringify(result), () => {
            console.log(chalk.bgGreen.bold("\n\n Exported file successfully!"));
            done();
        });
    },
    sendMessage: async function (data, done) {
        const sqs = new SQSHelper();
        const params = {
            QueueUrl:
                "https://sqs.eu-west-1.amazonaws.com/765151898027/QAS_Invoices_From_LSP",
            MessageBody:
                "%3C%3Fxml%20version%3D%271.0%27%20encoding%3D%27UTF-8%27%3F%3E%0A%3CInvoices%3E%0A%3CInvoice%3E%0A%3CStoreFront%3EArgentinaStore%3C%2FStoreFront%3E%0A%3CSellerId%3E55710%20%3C%2FSellerId%3E%0A%3COrderId%3E4249610%3C%2FOrderId%3E%0A%3CInvoiceId%3E0011-FAC-A00000098%3C%2FInvoiceId%3E%0A%3CInvoiceDate%3E2022-01-10%3C%2FInvoiceDate%3E%0A%3CInvoiceDueDate%3E2022-01-20%3C%2FInvoiceDueDate%3E%0A%3CAmount%3E121.00%3C%2FAmount%3E%0A%3CCurrency%3EARS%3C%2FCurrency%3E%0A%3CPaymentReferece%3E%3C%2FPaymentReferece%3E%0A%3CStatus%3EPending%3C%2FStatus%3E%0A%3C%2FInvoice%3E%0A%3C%2FInvoices%3E%0A",
        };
        done(await sqs.sendMessage(params));
    },
};
