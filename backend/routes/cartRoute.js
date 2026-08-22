import express from "express";
import {addItemToCart, deleteCartItem, getCartItems, updateCartItem} from "../controllers/cartController.js";
import {protect} from "../middleware/authMiddleware.js";

const cartRouter = express.Router();

cartRouter.use(protect);

cartRouter.get('/items', getCartItems);
cartRouter.post('/items', addItemToCart);
cartRouter.put('/items/:id', updateCartItem);
cartRouter.delete('/items/:id', deleteCartItem);

export default cartRouter;