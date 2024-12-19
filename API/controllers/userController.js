import { Router } from "express";
import userService from "../services/userService.js";
import User from "../models/User.js";
import jwt from "../lib/jwt.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const userController = Router();
const JWT_SECRET = "671c0a272cf14503d6270267vr391a10";

userController.get('/api/users', async (req, res) => {
    const users = await userService.getAll().lean();
    res.json(users);
});

userController.get('/api/users/:id', isAuth, (req, res) => {
    res.json({user : req.user});
});
userController.get('/api/users/profile', async (req, res) => {
    const token = req.cookies.auth;

    if(!token){
        return res.status(401).json({message: "No token provided"})
    }
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
    }
    catch(err){
        console.log(err);
    }
});

userController.post("api/users/:id/edit", (req, res) => {

})

export default userController;