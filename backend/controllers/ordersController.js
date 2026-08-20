import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const placeOrder = async (request, response) => {
    try {
        const userID = request.userID;
        const {items, amount, address} = request.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return response.status(422).json({status: false, msg: 'Items are required and must be an array'})
        }

        if (!amount || typeof amount !== 'number' || amount <= 0) {
            return response.status(422).json({status: false, msg: 'Amount must be a positive number'})
        }

        // if (!address || typeof address !== 'string' || address.trim().length < 5) {
        //     return response.status(422).json({status: false, msg: 'Valid address is required'})
        // }

        const orderData = {
            userID,
            items,
            amount,
            address,
            payment: false,
            paymentMethod: "COD",
            date: Date.now()
        }

        const order = await orderModel.create(orderData);

        await userModel.findByIdAndUpdate(userID, {cartData: {}});

        return response.status(201).json({
            status: true,
            msg: "Order successfully created"
        });
    } catch (e) {
        console.error(e);
        return response.status(500).json({
            status: false,
            msg: "Something went wrong"
        });
    }
}

const placeOrderByStripe = async (request, response) => {

}

const placeOrderByRazor = async (request, response) => {

}

const getOrdersByUser = async (request, response) => {
    try {
        const userID = request.userID;

        const orders = await orderModel.find({userID: userID});

        return response.status(200).json({
            status: true,
            items: orders
        });
    } catch (e) {
        console.error(e);
        return response.status(500).json({
            status: false,
            msg: "Something went wrong"
        });
    }
}

const getOrders = async (request, response) => {
    try {
        const orders = await orderModel.find({});

        return response.status(200).json({
            status: true,
            records: orders
        });
    } catch (e) {
        console.error(e);
        return response.status(500).json({
            status: false,
            msg: "Something went wrong"
        })
    }
}

const updateOrder = async (request, response) => {
    try {
        const {status} = request.body;
        const orderID = request.params.orderID;

        await orderModel.findByIdAndUpdate(orderID, {status: status});

        response.status(200).json({
            status: true,
            msg: "Order successfully updated"
        });
    } catch (e) {
        console.error(e);
        return response.status(500).json({
            status: false,
            msg: "Something went wrong"
        })
    }
}

export {placeOrder, placeOrderByStripe, placeOrderByRazor, getOrdersByUser, getOrders, updateOrder};