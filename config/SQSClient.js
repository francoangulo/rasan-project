import { SQSClient } from "@aws-sdk/client-sqs";
import AWS from "aws-sdk";
import * as dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.ENVIRONMENT}` });

const sqsClient = new SQSClient({
  region: process.env.AWS_REGION,
  credentials: new AWS.Credentials(
    process.env.AWS_ACCESS_KEY_ID,
    process.env.AWS_SECRET_ACCESS_KEY
  ),
});

export { sqsClient };
