import jwt from 'jsonwebtoken';

const verifyAdmin = async (request, response, next) => {
    try {
        const authHeader = request.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"
        if (!token) {
            return response.status(401).json({
                success: false,
                msg: "Not authorized, please login again"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.email !== process.env.ADMIN_EMAIL) {
            return response.status(401).json({
                success: false,
                msg: "Not authorized, please login again"
            });
        }

        next();
    } catch (e) {
        console.log(e);
        response.status(401).json({
            success: false,
            msg: "Invalid or expired token"
        });
    }
}

export default verifyAdmin;