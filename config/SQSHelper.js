const {
  SQSClient,
  ListQueuesCommand,
  GetQueueAttributesCommand,
  SendMessageCommand,
  ReceiveMessageCommand,
} = require("@aws-sdk/client-sqs");

class SQSHelper {
  constructor() {
    this.client = new SQSClient();
  }

  listQueues() {
    return this.client.send(new ListQueuesCommand({}));
  }

  getQueueAttributes(params) {
    return this.client.send(new GetQueueAttributesCommand(params));
  }

  sendMessage(params) {
    return this.client.send(new SendMessageCommand(params));
  }
  receiveMessage(params) {
    return this.client.send(new ReceiveMessageCommand(params));
  }
}

module.exports = SQSHelper;
