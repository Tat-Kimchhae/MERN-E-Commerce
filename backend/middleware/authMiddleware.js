import jwt from "jsonwebtoken";

export const protect = (request, response, next) => {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return response.status(401).json({
            status: false,
            msg: "Not authorized, no token"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        request.userID = decoded.id;
        next();
    } catch (error) {
        console.error("JWT verify failed:", error.message);
        return response.status(401).json({
            status: false,
            msg: "Not authorized, token failed"
        });
    }
};