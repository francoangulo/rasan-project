import express from "express";
const router = express.Router();
import { SendMessageCommand } from "@aws-sdk/client-sqs";
import { sqsClient } from "../../config/SQSClient.js";

router.get("/put-invoice", async (req, res) => {
  const SQS_PARAMS = {
    QueueUrl: process.env.INVOICE_PUT,
    // !This is the XML encoded Message, with the structure specified below this route
    MessageBody:
      "%3C%3Fxml%20version%3D%271.0%27%20encoding%3D%27UTF-8%27%3F%3E%0A%3CInvoices%3E%0A%3CInvoice%3E%0A%3CStoreFront%3EArgentinaStore%3C%2FStoreFront%3E%0A%3CSellerId%3E55710%3C%2FSellerId%3E%0A%3COrderId%3E5907979%3C%2FOrderId%3E%0A%3CInvoiceId%3E456879%3C%2FInvoiceId%3E%0A%3CInvoiceDate%3E2020-07-25%3C%2FInvoiceDate%3E%0A%3CInvoiceDueDate%3E2020-08-25%3C%2FInvoiceDueDate%3E%0A%3CAmount%3E3500.00%3C%2FAmount%3E%0A%3CCurrency%3EARS%3C%2FCurrency%3E%0A%3CPaymentReferece%3E%3C%2FPaymentReferece%3E%0A%3CStatus%3EPending%3C%2FStatus%3E%0A%3C%2FInvoice%3E%0A%3C%2FInvoices%3E",
  };
  try {
    const result = await sqsClient.send(new SendMessageCommand(SQS_PARAMS));
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error });
  }
});

// <?xml version='1.0' encoding='UTF-8'?>
// <Invoices>
// <Invoice>
// <StoreFront>ArgentinaStore</StoreFront>
// <SellerId>50410</SellerId> //reemplazar por el ID_EZD
// <OrderId>1481139</OrderId> //reemplazar por el nro de orden
// <InvoiceId>456879</InvoiceId> //reemplazar por el ID de la factura
// <InvoiceDate>2020-07-25</InvoiceDate>
// <InvoiceDueDate>2020-08-25</InvoiceDueDate>
// <Amount>1000.00</Amount>
// <Currency>ARS</Currency>
// <PaymentReferece></PaymentReferece>
// <Status>Pending</Status>
// </Invoice>
// </Invoices>

export default router;
