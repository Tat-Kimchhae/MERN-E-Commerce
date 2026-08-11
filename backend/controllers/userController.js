import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const getToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {});
};

const loginUser = async (request, response) => {

};

const registerUser = async (request, response) => {
    try {
        const {name, email, password} = request.body;

        if (!name || name.trim().length === 0) {
            return response.status(422).json({
                success: false,
                msg: "Name is required"
            });
        }

        if (!validator.isEmail(email)) {
            return response.status(422).json({
                success: false,
                msg: "Invalid email address"
            });
        }

        if (password.length < 8) {
            return response.status(422).json({
                success: false,
                msg: "Password must be at least 8 characters"
            });
        }

        const exists = await userModel.findOne({email});
        if (exists) {
            return response.status(409).json({
                success: false,
                msg: "User already existed"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = {name, email, password: hash};

        const user = await userModel.create(newUser);

        const token = getToken(user._id);

        return response.status(201).json({
            success: true,
            token: token,
        });
    } catch (e) {
        console.error(e);
        return response.status(500).json({
            success: false,
            msg: "Error creating user"
        });
    }
};

const loginAdmin = async (request, response) => {

}

export {loginUser, registerUser, loginAdmin}