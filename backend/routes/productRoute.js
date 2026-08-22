import express from "express";
import {addProduct, deleteProduct, getProduct, getProducts} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import verifyAdmin from "../middleware/adminMiddleware.js";

const productRouter = express.Router();

productRouter.get("/:id", getProduct);
productRouter.get("/", getProducts);
productRouter.post("/", verifyAdmin, upload.array("images", 4), addProduct);
productRouter.delete("/:id", verifyAdmin, deleteProduct);

export default productRouter