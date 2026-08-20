import React, {useState} from "react";
import {toast} from "react-toastify";
import axios from "axios";
import {baseURL} from "../App.jsx";

const Orders = () => {
    const [orders, setOrders] = useState([]);

    const getOrders = async () => {
        try {
            const response = await axios.get(`${baseURL}/api/cart/`);
            if (!response.data.status) {
                toast.warning(response.data.msg);
                return;
            }
            setOrders(response.data.records);
        } catch (e) {
            console.error(e);
            toast.error(e.response?.data?.msg || e.message || "Something went wrong");
        }
    }

    return (
        <div></div>
    )
}

export default Orders