import * as dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.ENVIRONMENT}` });
import https from "https";
import axios from "axios";
import fs from "fs";
import { parseString } from "xml2js";

const getOrders = async () => {
  const rawXML = await readFileAsync("./orderToUpdate.xml", "utf8");
  return rawXML;
};

const readFileAsync = (path, encoding) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, encoding, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};

const writeFileAsync = (fileName, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

const parseXml = (xmlData) => {
  return new Promise((resolve, reject) => {
    parseString(xmlData, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const updateOrderStatus = async () => {
  const myHeaders = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    "X-Channel": "Web",
    "Content-Type": "application/xml",
  };

  const rawXML = await getOrders();

  const requestOptions = {
    headers: myHeaders,
    httpsAgent: new https.Agent({ rejectUnauthorized: false }), // Custom agent with rejectUnauthorized set to false
  };

  try {
    const response = await axios.post(
      process.env.URL_UPDATE_ORDER_STATUS,
      rawXML,
      requestOptions
    );
    console.log(response.data);
    const parsedXml = await parseXml(response.data);
    console.log("parsedXML --> ", parsedXml);
    const requestId = parsedXml["response-data"].RequestId[0];
    writeFileAsync(`./${requestId}.xml`, response.data);
  } catch (error) {
    console.error("Error: ", error);
    writeFileAsync(
      `./fail.txt`,
      "There was an error updating the order status"
    );
  }
};

updateOrderStatus();
