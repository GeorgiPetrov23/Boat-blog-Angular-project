import { AUTH_COOKIE_NAME } from "../constants.js"
import jwt from "../lib/jwt.js";
const JWT_SECRET = "671c0a272cf14503d6270267vr391a10";

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies[AUTH_COOKIE_NAME];

    if(!token){
        return next();
    }

    try {
        const decodetToken = await jwt.verify(token, JWT_SECRET);

        req.user = decodetToken;
        req.isAuthenticated = true;
        res.locals.user = decodetToken;
        res.locals.isAuthenticated = true;
        
        next()
    } catch (err) {
        res.clearCookie(AUTH_COOKIE_NAME);
    }
}

export const isAuth = (req, res, next) => {
    if(!req.user){
        return res.json({message :"No token provided"});
    };
    next()
}