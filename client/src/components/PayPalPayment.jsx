import React, {useState} from "react"
import {PayPalButtons} from "@paypal/react-paypal-js";
import {Navigate} from "react-router-dom";

const PayPalPayment = ({item, id}) => {

    const serverUrl = `${import.meta.env.VITE_EXPRESS_URL}`
    const [success, setSuccess] = useState(false)

    const createOrder = (data) => {
        if(item === "summeredit50") {
            return fetch(`${serverUrl}/my-server/create-paypal-order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    product: {
                        description: 'Summer Edit Pacchetto Video',
                        cost: 50.00
                    }
                })
            }).then((response) => response.json()).then((order) => order.id)
        } else if(item === "summeredit80") {
            return fetch(`${serverUrl}/my-server/create-paypal-order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    product: {
                        description: 'Summer Edit Pacchetto Video + Foto',
                        cost: 80.00
                    }
                })
            }).then((response) => response.json()).then((order) => order.id)
        }
    }
    const onApprove = (data) => {
        console.log(id)
        return fetch(`${serverUrl}/my-server/capture-paypal-order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                orderID: data.orderID,
                editId: id
            })
        }).then((response) => {
            console.log("Payment successful")
            setSuccess(true)
        })

    }

    return <>
        {success === false ?
            <PayPalButtons
                createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={(data, actions) => onApprove(data, actions, id)}>
            </PayPalButtons>
        :
            <Navigate to={'/thankyou'}/>
        }
    </>
}

export default PayPalPayment
