import React from "react"
import {PayPalButtons} from "@paypal/react-paypal-js";

const PayPalPayment = () => {

    const serverUrl = "http://localhost:8888"
    const createOrder = (data) => {
        return fetch(`${serverUrl}/my-server/create-paypal-order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                product: {
                    description: "Summer Edit",
                    cost: "1.00"
                }
            })
        }).then((response) => response.json()).then((order) => order.id)
    }
    const onApprove = (data) => {
        return fetch(`${serverUrl}/my-server/capture-paypal-order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                orderID: data.orderID
            })
        }).then((response) => {
            console.log("Payment successful")
            return response.json()
        }).then((data) => console.log(data))
    }
    return <PayPalButtons
        createOrder={(data, actions) => createOrder(data, actions)}
        onApprove = {(data, actions) => onApprove(data, actions)}>
    </PayPalButtons>
}

export default PayPalPayment