import express from 'express';
import mongoose from 'mongoose';
import boatController from './controllers/boatController.js';
import userController from './controllers/userController.js';
import User from "./models/User.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authController from './controllers/authController.js';
import { authMiddleware } from './middlewares/authMiddleware.js';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

const url = 'mongodb://localhost:27017';
mongoose.connect(url, {dbName: 'Boat_blog'})
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB failed: " + err));
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
  }));
app.use(cookieParser());
app.use(authMiddleware);
app.use(bodyParser.json());
app.use(authController);
app.use(boatController);
app.use(userController);
app.get('/api/users', async (req, res) => {
    try{
        const users = await User.find();
        console.log(users);
        res.json(users);
    }catch(err){
        console.log(err);
    }
})
app.get('/', (req, res) => {
    res.send("Welcome to mongoDB server");
})

app.listen(3000, () => console.log(`Server is running on http://localhost:${port}`))