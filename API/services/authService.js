import bcrypt from "bcrypt";
import User from '../models/User.js';
import jwt from '../lib/jwt.js';
const JWT_SECRET = "671c0a272cf14503d6270267vr391a10";
const authService = {
    async register(username, email, password, rePassword){
        const user = await User.findOne({ $or: [{ email }, { username } ]});

        if(password !== rePassword){
            
            throw new Error("Password missmatch");
        }
        if(user){
            throw new Error("User already exists");
        }

        const newUser = await User.create({
            username,
            email,
            password
        })
        return this.generateToken(newUser);
    },

    async login(email, password){
        const user = await User.findOne({email}).lean();

        if(!user){
            console.log("invalid user");
        }

        const isValid = await bcrypt.compare(password, user.password);

        if(!isValid){
            console.log("invalid");
        }
        return this.generateToken(user);
    },
    async generateToken(user){
        const payload = {
            _id: user._id,
            email: user.email,
            username: user.username
        };
        console.log(payload);
        console.log(JWT_SECRET);
        const header = { expiresIn: "1d" };
        console.log(header);
        const token = await jwt.sign(payload, JWT_SECRET, header);
        console.log(token);
        return token;
    },
}
export default authService;