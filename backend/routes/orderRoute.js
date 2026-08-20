import express from "express";
import {getOrders, getOrdersByUser, placeOrder, placeOrderByRazor, placeOrderByStripe, updateOrder} from "../controllers/ordersController.js";
import {protect} from "../middleware/authMiddleware.js";
import verifyAdmin from "../middleware/adminMiddleware.js";

const orderRouter = express.Router();

// User endpoints
orderRouter.get("/user", protect, getOrdersByUser);
orderRouter.post("/place", protect, placeOrder);
orderRouter.post("/place/stripe", protect, placeOrderByStripe);
orderRouter.post("/place/razor", protect, placeOrderByRazor);

// Admin endpoints
orderRouter.get("", verifyAdmin, getOrders);
orderRouter.put("/:orderID", verifyAdmin, updateOrder);

export default orderRouter