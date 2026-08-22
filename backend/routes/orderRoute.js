import express from "express";
import {getOrders, getOrdersByUser, placeOrder, updateOrder} from "../controllers/ordersController.js";
import {protect} from "../middleware/authMiddleware.js";
import verifyAdmin from "../middleware/adminMiddleware.js";

const orderRouter = express.Router();

// User endpoints
orderRouter.get("/user", protect, getOrdersByUser);
orderRouter.post("/place", protect, placeOrder);

// Admin endpoints
orderRouter.get("", verifyAdmin, getOrders);
orderRouter.put("/:orderID", verifyAdmin, updateOrder);

export default orderRouter