import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const getToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {});
};

const loginUser = async (request, response) => {
    try {
        const {email, password} = request.body;

        if (!validator.isEmail(email)) {
            return response.status(422).json({
                status: false,
                msg: "Invalid email address"
            });
        }

        const user = await userModel.findOne({email});
        if (!user) {
            return response.status(404).json({
                status: false,
                msg: "User does not exist."
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return response.status(401).json({
                status: false,
                msg: "Invalid credentials"
            });
        }

        return response.status(200).json({
            status: true,
            token: getToken(user._id)
        });
    } catch (e) {
        console.error(e);
        return response.status(500).json({
            status: false,
            msg: "Error loggin in"
        });
    }
};

const registerUser = async (request, response) => {
    try {
        const {name, email, password} = request.body;

        if (!name || name.trim().length === 0) {
            return response.status(422).json({
                status: false,
                msg: "Name is required"
            });
        }

        if (!validator.isEmail(email)) {
            return response.status(422).json({
                status: false,
                msg: "Invalid email address"
            });
        }

        if (password.length < 8) {
            return response.status(422).json({
                status: false,
                msg: "Password must be at least 8 characters"
            });
        }

        const exists = await userModel.findOne({email});
        if (exists) {
            return response.status(409).json({
                status: false,
                msg: "User already existed"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = {name, email, password: hash};

        const user = await userModel.create(newUser);

        const token = getToken(user._id);

        return response.status(201).json({
            status: true,
            token: token,
        });
    } catch (e) {
        console.error(e);
        return response.status(500).json({
            status: false,
            msg: "Error creating user"
        });
    }
};

const loginAdmin = async (request, response) => {
    try {
        const {email, password} = request.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: '1d'});

            return response.status(200).json({
                status: true,
                token
            });
        }

        response.status(401).json({
            status: false,
            msg: "Invalid credentials"
        });
    } catch (e) {
        console.log(e);
        response.status(500).json({
            status: false,
            msg: "Something went wrong while logging in."
        });
    }
}

export {loginUser, registerUser, loginAdmin}