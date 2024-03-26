import axios from "axios";
import https from "https";

const updateOrderStatus = async () => {
  const myHeaders = new Headers();
  myHeaders.append("client_id", "a9b29676cfb14daa859d5d69c6cf0889");
  myHeaders.append("client_secret", "237439F4ccab40878df52D62d2658f52");
  myHeaders.append("X-Channel", "Web");
  myHeaders.append("Content-Type", "application/xml");

  const raw =
    "<?xml version='1.0' encoding='UTF-8'?>\n<OrderUpdates>\n    <OrderStatus>\n        <SellerId>55710</SellerId>\n        <Storefront>ArgentinaStore</Storefront>\n        <OrderNumber>8315922</OrderNumber>\n        <Status>Delivered</Status>\n        <EZDOrderNumber>12345</EZDOrderNumber>\n    </OrderStatus>\n</OrderUpdates>";

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const instance = axios.create({
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });

    const response = await instance.post(
      "https://alb-pmi-reev-prd.lb.anypointdns.net/prd-reev-mulesoft-dte-ccb2b/v1/api/v1/orderstatusupdate",
      requestOptions
    );

    console.log("the response: ", JSON.stringify(response, null, 4));
  } catch (error) {
    console.error("franco an error: ", error);
  }

  //   fetch(
  //     "https://alb-pmi-reev-prd.lb.anypointdns.net/prd-reev-mulesoft-dte-ccb2b/v1/api/v1/orderstatusupdate",
  //     requestOptions
  //   )
  //     .then((response) => response.text())
  //     .then((result) => console.log(result))
  //     .catch((error) => console.error(error));
};

updateOrderStatus();
