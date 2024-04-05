import * as dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.ENVIRONMENT}` });
import https from "https";
import axios from "axios";
import { readdir, readFile, readFileSync, rename, unlink, writeFile } from "fs";

const getSecuences = async () => {
  const secuencesSanRafael = await readFolderAsync("./eSEC/SEC_SRA", "utf8");
  const secuencesGralAlvear = await readFolderAsync("./eSEC/SEC_GRA", "utf8");
  const secuencesMalargue = await readFolderAsync("./eSEC/SEC_MAL", "utf8");
  const secuencesObject = {
    sanRafael: secuencesSanRafael,
    gralAlvear: secuencesGralAlvear,
    malargue: secuencesMalargue,
  };
  console.log(
    "franco the secuences files --> ",
    JSON.stringify(secuencesObject, null, 4)
  );
  return secuencesObject;
};

const readFolderAsync = (path, encoding) => {
  return new Promise((resolve, reject) => {
    readdir(path, encoding, (error, filesList) => {
      if (error) {
        reject(error);
      } else {
        resolve(filesList);
      }
    });
  });
};

const readFileAsync = (path, encoding) => {
  return new Promise((resolve, reject) => {
    readFile(path, encoding, (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};

const renameFileAsync = (filePath, newName) => {
  return new Promise((resolve, reject) => {
    rename(filePath, newName, (err) => {
      if (err) reject(err);
      resolve(console.log("file renamed --> ", newName));
    });
  });
};

const sendSanRafaelSecuences = async (secuencesSanRafael, myHeaders) => {
  secuencesSanRafael.forEach(async (secuence) => {
    if (secuence.startsWith("e_")) return;
    const fileData = await readFileAsync(`./eSEC/SEC_SRA/${secuence}`, "utf8");

    const fileDataObject = JSON.parse(fileData);
    const sequenceNumber = fileDataObject.sales[0].sequenceNumber;
    const branchCode = fileDataObject.sales[0].branchCode;
    const EZDCode = fileDataObject.sales[0].EZDCode;

    const requestOptions = {
      headers: { ...myHeaders, sequenceNumber, branchCode, EZDCode },
    };

    const response = await axios.post(
      process.env.POST_SECUENCE_URL,
      fileData,
      requestOptions
    );

    console.log("response data --> ", response.data);
    console.log("response status --> ", response.status);
    if ([200, 201].includes(response.status)) {
      await renameFileAsync(
        `./eSEC/SEC_SRA/${secuence}`,
        `./eSEC/SEC_SRA/e_${secuence}`
      );
    }
  });
};

const sendGralAlvearSecuences = async (secuencesGralAlvear, myHeaders) => {
  secuencesGralAlvear.forEach(async (secuence) => {
    if (secuence.startsWith("e_")) return;
    const fileData = await readFileAsync(`./eSEC/SEC_GRA/${secuence}`, "utf8");

    const fileDataObject = JSON.parse(fileData);
    const sequenceNumber = fileDataObject.sales[0].sequenceNumber;
    const branchCode = fileDataObject.sales[0].branchCode;
    const EZDCode = fileDataObject.sales[0].EZDCode;

    const requestOptions = {
      headers: { ...myHeaders, sequenceNumber, branchCode, EZDCode },
    };

    const response = await axios.post(
      process.env.POST_SECUENCE_URL,
      fileData,
      requestOptions
    );

    console.log("response data --> ", response.data);
    console.log("response status --> ", response.status);
    if ([200, 201].includes(response.status)) {
      await renameFileAsync(
        `./eSEC/SEC_GRA/${secuence}`,
        `./eSEC/SEC_GRA/e_${secuence}`
      );
    }
  });
};
const sendMalargueSecuences = async (secuencesMalargue, myHeaders) => {
  secuencesMalargue.forEach(async (secuence) => {
    if (secuence.startsWith("e_")) return;
    const fileData = await readFileAsync(`./eSEC/SEC_MAL/${secuence}`, "utf8");

    const fileDataObject = JSON.parse(fileData);
    const sequenceNumber = fileDataObject.sales[0].sequenceNumber;
    const branchCode = fileDataObject.sales[0].branchCode;
    const EZDCode = fileDataObject.sales[0].EZDCode;

    const requestOptions = {
      headers: { ...myHeaders, sequenceNumber, branchCode, EZDCode },
    };

    const response = await axios.post(
      process.env.POST_SECUENCE_URL,
      fileData,
      requestOptions
    );

    console.log("response data --> ", response.data);
    console.log("response status --> ", response.status);
    if ([200, 201].includes(response.status)) {
      await renameFileAsync(
        `./eSEC/SEC_MAL/${secuence}`,
        `./eSEC/SEC_MAL/e_${secuence}`
      );
    }
  });
};

const postSecuences = async () => {
  const myHeaders = {
    client_id: process.env.POST_SECUENCE_CLIENT_ID,
    client_secret: process.env.POST_SECUENCE_CLIENT_SECRET,
    "X-Channel": "Web",
    "Content-Type": "application/json",
  };

  const secuencesObject = await getSecuences();

  //   const requestOptions = {
  //     headers: myHeaders,
  //     httpsAgent: new https.Agent({ rejectUnauthorized: false }), // Custom agent with rejectUnauthorized set to false
  //   };

  try {
    sendSanRafaelSecuences(secuencesObject.sanRafael, myHeaders);
    sendGralAlvearSecuences(secuencesObject.gralAlvear, myHeaders);
    sendMalargueSecuences(secuencesObject.malargue, myHeaders);
  } catch (error) {
    console.error("Error: ", error);
  }
};

postSecuences();
// updateOrderStatus();
