export const fetchAsync = async body => {
  return await fetch(
    `https://4i48oxh8hb.execute-api.us-east-1.amazonaws.com/dev/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined
    }
  )
    .then(response => response.json())
    .catch(error => console.log("error", error));
};

export const logOutAsync = async headers => {
  return await fetch(
    `https://4i48oxh8hb.execute-api.us-east-1.amazonaws.com/dev/logout`,
    {
      method: "POST",
      headers: headers && headers
    }
  );
};

export const fetchOrderStatusAsync = async () => {
  return await fetch(
    `https://4i48oxh8hb.execute-api.us-east-1.amazonaws.com/dev/orders/statuses`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    }
  )
    .then(response => response.json())
    .catch(error => console.log("error", error));
};
export const fetchOrderAsync = async (
  headers,
  orderStatus = "paid",
  limit = "",
  offsetOrderId = ""
) => {
  return await fetch(
    `https://4i48oxh8hb.execute-api.us-east-1.amazonaws.com/dev/orders?orderStatus=${orderStatus}&limit=${limit}&offsetOrderId=${offsetOrderId}`,
    {
      method: "GET",
      headers: headers && headers
    }
  )
    .then(response => response.json())
    .catch(error => console.log("error", error));
};
