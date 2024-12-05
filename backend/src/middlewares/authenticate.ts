import { NextFunction, Request, Response } from "express";
import  jwt, { decode } from "jsonwebtoken";
import { User } from "../models/user";
export const authenticate = async(req: Request, res: Response, next: NextFunction) => {
    const authHeader= req.headers['authorization']
    //it is going to be bearer empty space and the token, must use split method
    const token= authHeader?.split(' ')[1]
    if (!token) {
        res.status(401).json({message: "token missing"})
        return
    }  

    jwt.verify(token, process.env.JWT_SECRET!, async (error, decodedToken)=> {
        if(error || !decodedToken || typeof decodedToken==='string' || !(await User.exists({_id: decodedToken.userId}))) {
            res.status(401).json({message: 'unauthenticathed'})
            return
        }

        req.userId= decodedToken.userId
        next()
    })

}