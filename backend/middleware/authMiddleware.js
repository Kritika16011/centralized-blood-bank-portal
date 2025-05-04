/*import jwt from "jsonwebtoken";

const JWT_SECRET = "your-secure-jwt-secret";

export const authenticateToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access denied" });

    try {
        const verified = jwt.verify(token.split(" ")[1], JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
};*/

