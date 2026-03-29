import jwt from "jsonwebtoken";

export default function authenticate(req, res, next) {
    
    const authHeader = req.headers.authorization;

    //check if header exists

    if(!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "No Token Provided"
        })
    }

    const token = authHeader.split(" ")[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // attach user to the request
        req.user = decoded
        console.log(">>> message from backend (Authenticate.js) [req.user and decoded]:", req.user, decoded)

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
    });
    }
}