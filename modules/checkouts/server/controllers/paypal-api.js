var path = require('path');
var config = require(path.resolve('./config/config'));

//var fetch = import('node-fetch');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
var CLIENT_ID = config.paypal.clientID; //AY1MyhC3J0flDf_jJIDmxFWdtLQhPf1ekMRVNMKstOBM9WFPGhIdsciDkOrIGeYz9Di9eeMqO30KbJ_4
var APP_SECRET = config.paypal.clientSecret; //EEdeCmewXtXmpKv9CptNa_YHXw35G3ODUsZCe44o_Y76_qrQtkVi6x0UQW13Nh6VtGE4sKEFJzX9MuZW

const base = "https://api-m.sandbox.paypal.com";

exports.createOrder = async function(total) {
  const accessToken = await generateAccessToken();

  const url = `${base}/v2/checkout/orders`;

  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: total,
          },
        },
      ],
    }),
  });
console.log("finish");
  return handleResponse(response);
}

exports.capturePayment = async function(orderId) {
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderId}/capture`;
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return handleResponse(response);
}


async function generateAccessToken() {
  console.log("start generateAccessToken");
    const auth = Buffer.from(CLIENT_ID + ":" + APP_SECRET).toString("base64");
  const response = await fetch(`${base}/v1/oauth2/token`, {
    method: "post",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });
console.log("almost finish generateAccessToken");

  const jsonData = await handleResponse(response);
  return jsonData.access_token;
  

}
async function handleResponse(response) {
  if (response.status === 200 || response.status === 201) {
    return response.json();
  }

  const errorMessage = await response.text();
  throw new Error(errorMessage);
}
