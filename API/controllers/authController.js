import { Router } from 'express';
import authService from '../services/authService.js';
import { AUTH_COOKIE_NAME } from '../constants.js';

const authController = Router();

authController.post('/api/register', async (req, res) => {
    const {username, email, password, rePassword} = req.body;
    try {
        const token = await authService.register(username, email, password, rePassword);
        res.cookie(AUTH_COOKIE_NAME, token, {httpOnly: true});
        res.status(200)
    } catch (err) {
        res.status(404);
    }
});


authController.post('/api/login', async (req, res) => {
    const {email, password} = req.body;
    console.log(email, password);
    try{
        const token = await authService.login(email, password);
        res.cookie(AUTH_COOKIE_NAME, token, {httpOnly: true});
        return res.json({message: "login successfull"});
    }catch(err){
        res.status(200);
    }
});
authController.post('/api/logout', (req, res) =>{
    try{
        res.clearCookie("auth", {httpOnly: true});
        res.status(200).json({ message: 'Logged out successfully' });
    }
    catch(err){
        console.log(err);
    }
});
 
export default authController;