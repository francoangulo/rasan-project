export const getOrderNumber = (body) => {
  const start =
    String(body).lastIndexOf("<OrderNumber>") + "<OrderNumber>".length;
  const end = String(body).lastIndexOf("</OrderNumber>");
  const newName = String(body).substring(start, end);
  return newName;
};
