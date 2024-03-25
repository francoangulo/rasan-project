import express from "express";
const router = express.Router();
import { ReceiveMessageCommand, SendMessageCommand } from "@aws-sdk/client-sqs";
import { sqsClient } from "../../config/SQSClient.js";

router.get("/get-order", async (req, res) => {
  const SQS_PARAMS = {
    QueueUrl: process.env.GET_ORDER,
  };

  try {
    const result = await sqsClient.send(new ReceiveMessageCommand(SQS_PARAMS));
    const bodyMessage = result.Messages ? result.Messages[0].Body : false;
    if (!bodyMessage) result.Messages = { message: "No order found" };
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// router.put("/put-order", async (req, res) => {
//   const SQS_PARAMS = {
//     QueueUrl: process.env.PUT_ORDER,
//     // !This is the XML encoded Message, with the structure specified below this route
//     MessageBody:
//       "%3C%3Fxml%20version%3D%271.0%27%20encoding%3D%27UTF-8%27%3F%3E%0A%3COrderUpdates%3E%0A%3COrderStatus%3E%0A%3CSellerId%3E55710%3C%2FSellerId%3E%20%0A%3CStorefront%3EArgentinaStore%3C%2FStorefront%3E%0A%3COrderNumber%3E5907979%3C%2FOrderNumber%3E%20%0A%3CStatus%3EDelivered%3C%2FStatus%3E%20%0A%3CEZDOrderNumber%3E12345%3C%2FEZDOrderNumber%3E%20%0A%3C%2FOrderStatus%3E%0A%3C%2FOrderUpdates%3E",
//   };

//   try {
//     const result = await sqsClient.send(new SendMessageCommand(SQS_PARAMS));
//     return res.status(200).json(result);
//   } catch (error) {
//     return res.status(500).json({ error });
//   }
// });

router.put("/put-order", async (req, res) => {
  const { body } = req;
  console.log({ body });
  try {
    return res.status(200).json({ "mensaje-recibido": body.message });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

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

router.delete("/delete-order", async (req, res) => {
  const SQS_PARAMS = {
    QueueUrl: process.env.DELETE_ORDER,
    // !This is the Receipt Handle obtained in the action of getOrder. It must go encoded
    ReceiptHandle: "XXXX",
  };

  try {
    const result = await sqsClient.send(new SendMessageCommand(SQS_PARAMS));
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

export default router;
