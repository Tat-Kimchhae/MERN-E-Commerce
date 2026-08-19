import userModel from "../models/userModel.js";

const addItemToCart = async (request, response) => {
    try {
        const {itemID, size} = request.body;
        const userID = request.userID;

        const missingFields = [];
        if (!userID) missingFields.push("userID");
        if (!itemID) missingFields.push("itemID");
        if (!size) missingFields.push("size");

        if (missingFields.length > 0) {
            return response.status(400).json({
                status: false,
                msg: `${missingFields.join(", ")} ${missingFields.length > 1 ? "are" : "is"} required`
            });
        }

        const user = await userModel.findById(userID);
        if (!user) {
            return response.status(404).json({status: false, msg: "User not found"});
        }

        let cartData = user.cartData || {};

        if (cartData[itemID]) {
            if (cartData[itemID][size]) {
                cartData[itemID][size] += 1;
            } else {
                cartData[itemID][size] = 1;
            }
        } else {
            cartData[itemID] = {[size]: 1};
        }

        await userModel.findByIdAndUpdate(userID, {cartData});

        return response.json({
            status: true,
            msg: "Item added to cart"
        });
    } catch (e) {
        console.error(e);
        return response.status(500).json({
            status: false,
            msg: "Something went wrong"
        });
    }
};

const getCartItems = async (request, response) => {
    try {
        const userID = request.userID;

        const user = await userModel.findById(userID).select("cartData");
        if (!user) {
            return response.status(404).json({status: false, msg: "User not found"});
        }

        return response.json({
            status: true,
            cartData: user.cartData || {},
            countCart: Object.keys(user.cartData).length
        });
    } catch (e) {
        console.error(e);
        return response.status(500).json({
            status: false,
            msg: "Something went wrong"
        });
    }
};

const updateCartItem = async (request, response) => {
    try {
        const {size, quantity} = request.body;
        const userID = request.userID;
        const itemID = request.params.id;

        const missingFields = [];
        if (!itemID) missingFields.push("itemID");
        if (!size) missingFields.push("size");
        if (quantity === undefined) missingFields.push("quantity");

        if (missingFields.length > 0) {
            return response.status(400).json({
                status: false,
                msg: `${missingFields.join(", ")} ${missingFields.length > 1 ? "are" : "is"} required`
            });
        }

        if (quantity < 1) {
            return response.status(400).json({
                status: false,
                msg: "quantity must be at least 1"
            });
        }

        const user = await userModel.findById(userID);
        if (!user) {
            return response.status(404).json({status: false, msg: "User not found"});
        }

        let cartData = user.cartData || {};

        if (!cartData[itemID] || !cartData[itemID][size]) {
            return response.status(404).json({
                status: false,
                msg: "Item not found in cart"
            });
        }

        cartData[itemID][size] = quantity;

        await userModel.findByIdAndUpdate(userID, {cartData});

        return response.json({
            status: true,
            msg: "Cart item updated"
        });
    } catch (e) {
        console.error(e);
        return response.status(500).json({
            status: false,
            msg: "Something went wrong"
        });
    }
};

const deleteCartItem = async (request, response) => {
    try {
        const {size} = request.body;
        const userID = request.userID;
        const itemID = request.params.id;

        const missingFields = [];
        if (!itemID) missingFields.push("itemID");
        if (!size) missingFields.push("size");

        if (missingFields.length > 0) {
            return response.status(400).json({
                status: false,
                msg: `${missingFields.join(", ")} ${missingFields.length > 1 ? "are" : "is"} required`
            });
        }

        const user = await userModel.findById(userID);
        if (!user) {
            return response.status(404).json({status: false, msg: "User not found"});
        }

        let cartData = user.cartData || {};

        if (!cartData[itemID] || !cartData[itemID][size]) {
            return response.status(404).json({
                status: false,
                msg: "Item not found in cart"
            });
        }

        delete cartData[itemID][size];

        if (Object.keys(cartData[itemID]).length === 0) {
            delete cartData[itemID];
        }

        await userModel.findByIdAndUpdate(userID, {cartData});

        return response.json({
            status: true,
            msg: "Item removed from cart"
        });
    } catch (e) {
        console.error(e);
        return response.status(500).json({
            status: false,
            msg: "Something went wrong"
        });
    }
};

export {addItemToCart, getCartItems, updateCartItem, deleteCartItem};