import {v2 as cloudinary} from "cloudinary";
import productModel from "../models/productModel.js";

const getProducts = async (request, response) => {
    try {
        const products = await productModel.find({});

        response.status(200).json({
            status: true,
            products
        });
    } catch (e) {
        console.log(e);
        response.status(500).json({
            status: false,
            msg: "Something went wrong while fetching products."
        });
    }
}

const getProduct = async (request, response) => {
    try {
        const {id} = request.params;

        const product = await productModel.findById(id);

        if (!product) {
            return response.status(404).json({
                status: false,
                msg: "Product not found"
            });
        }

        response.status(200).json({
            status: true,
            product
        });
    } catch (e) {
        console.log(e);
        response.status(500).json({
            status: false,
            msg: "Something went wrong while fetching product."
        });
    }
}

const addProduct = async (request, response) => {
    try {
        const {name, description, price, category, subCategory, sizes, bestSeller} = request.body;
        const images = request.files;

        let imageURL = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {resource_type: "image"});
                return result.secure_url;
            })
        )

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestSeller: bestSeller === "true",
            image: imageURL,
            date: Date.now()
        }

        const product = await productModel.create(productData);

        response.status(200).json({
            status: true,
            msg: "Product created"
        })
    } catch (e) {
        console.log(e);
        response.status(500).json({
            status: false,
            msg: "Something went wrong while add product."
        });
    }
}

const deleteProduct = async (request, response) => {
    try {
        const {id} = request.params;

        const product = await productModel.findByIdAndDelete(id);

        if (!product) {
            return response.status(404).json({
                status: false,
                msg: "Product not found"
            });
        }

        response.status(200).json({
            status: true,
            msg: "Product deleted"
        });
    } catch (e) {
        console.log(e);
        response.status(500).json({
            status: false,
            msg: "Something went wrong while deleting product."
        });
    }
}

export {addProduct, getProducts, getProduct, deleteProduct}