import { Request, Response, Router } from "express";
import { User } from "../models/user";

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

export const authRouter= Router();

authRouter.post('/auth/sign-up',signUp)