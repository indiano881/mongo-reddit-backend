import { Request, Response, Router } from "express";
import { User } from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signUp= async (req: Request, res: Response) => {
    try {
        const {username, password}= req.body;
        if (!username || !password) {
            res.status(400).json({message: "missing username or password"})
            return //MUST PUT RETURN 
        }

        const existingUser= await User.findOne({username})
        if (existingUser) {
            res.status(400).json({message: "username already exists! Choose another one"})
            return
        }

        const user= new User({username, password})
        await user.save()
        res.status(201).json({message: "User created succesfully"})

    }catch (error) {
        res.status(500).send(); //must add send otherwise it stucks in loading mode
    }
}


const logIn = async (req: Request, res: Response) => {
    try {
        const {username, password}= req.body;
        if (!username || !password) {
            res.status(400).json({message: "missing username or password"})
            return //MUST PUT RETURN 
        }
        const user= await User.findOne({username},'+password') //becuase password is not send by default
        if (!user ||!(await bcrypt.compare(password, user.password))) {
            res.status(400).json({message: 'wrong username or password'})
        }
        const accesToken = jwt.sign({ userId: user!._id }, process.env.JWT_SECRET!, {
            expiresIn: '1h',
        });

        res.status(200).json({accesToken, userId: user!._id})
    } catch(error) {
        res.status(500).send(); //must add send otherwise it stucks in loading mode
    }
}
export const authRouter= Router();

authRouter.post('/auth/sign-up',signUp)
authRouter.post('/auth/log-in', logIn)