import express from "express";
const router = express.Router();
import { ReceiveMessageCommand, SendMessageCommand } from "@aws-sdk/client-sqs";
import { sqsClient } from "../../config/SQSClient.js";

router.get("/get-responses", async (req, res) => {
  const SQS_PARAMS = {
    QueueUrl: process.env.GET_RESPONSE,
  };
  try {
    const result = await sqsClient.send(new ReceiveMessageCommand(SQS_PARAMS));
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

export default router;
