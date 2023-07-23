import fetch from "node-fetch";

const { CLIENT_ID, APP_SECRET, PAYPAL_URL, STRAPI_PORT, BASE_URL } = process.env;

export async function createOrder(data) {
    const accessToken = await generateAccessToken();
    const url = `${PAYPAL_URL}/v2/checkout/orders`;
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
                        currency_code: "EUR",
                        value: data.product.cost,
                    },
                },
            ],
        }),
    });


    return handleResponse(response);
}

export async function capturePayment(orderId, editId) {
    const accessToken = await generateAccessToken();
    const url = `${PAYPAL_URL}/v2/checkout/orders/${orderId}/capture`;
    const response = await fetch(url, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    });

    //db update HERE
    const entryData = new FormData()
    entryData.append("data", JSON.stringify({pagato: true}))
    const dbResponse = await(fetch(`${BASE_URL}:${STRAPI_PORT}/api/summer-edits/${editId}`, {
        method: 'PUT',
        body: entryData
    }))
    return handleResponse(dbResponse);
}

export async function generateAccessToken() {
    const auth = Buffer.from(CLIENT_ID + ":" + APP_SECRET).toString("base64");
    const response = await fetch(`${PAYPAL_URL}/v1/oauth2/token`, {
        method: "post",
        body: "grant_type=client_credentials",
        headers: {
            Authorization: `Basic ${auth}`,
        },
    });

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