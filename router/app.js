import * as dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.ENVIRONMENT}` });

import express from "express";
import orders from "./routes/orders.js";
import invoices from "./routes/invoices.js";
import responses from "./routes/responses.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("HELLO WORLD!");
});

app.use(express.json());

app.use("/orders", orders);
app.use("/invoices", invoices);
app.use("/responses", responses);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
