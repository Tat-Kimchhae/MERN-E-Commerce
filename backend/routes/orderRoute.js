import express from "express";
import {getOrders, getOrdersByUser, placeOrder, placeOrderByRazor, placeOrderByStripe, updateOrder} from "../controllers/ordersController.js";
import {protect} from "../middleware/authMiddleware.js";
import verifyAdmin from "../middleware/adminMiddleware.js";

const orderRouter = express.Router();

// User endpoints
orderRouter.get("/orders/user", protect, getOrdersByUser);
orderRouter.post("/orders/place", protect, placeOrder);
orderRouter.post("/orders/place/stripe", protect, placeOrderByStripe);
orderRouter.post("/orders/place/razor", protect, placeOrderByRazor);

// Admin endpoints
orderRouter.get("/orders", verifyAdmin, getOrders);
orderRouter.put("/orders/items/:userID", verifyAdmin, updateOrder);

export default orderRouter