import { Router, type Request, type Response } from "express";
import { Post } from "../models/posts";
import { authenticate } from "../middlewares/authenticate";

const getPosts= async ( req: Request, res: Response) => {

    res.status(200).json([{title: "hello from post.ts"}, {title: "hello AgAIN post.ts"}])
    
}

const getSinglePost= async (req: Request, res: Response)=> {

    const {id}= req.params

    res.status(200).json([{title: "hello from SINGLE POST post.ts", id}])
    console.log(req)
}

const createPost= async(req: Request , res:Response )=> {
    try {
        const {title, content} = req.body;
        if (!title || typeof title !== 'string') {
            res.status(400).json({message: 'not valid tipe of input'})
            return
        }
        if (content !== undefined && typeof content !== 'string') {
            res.status(400).json({message: 'not valid tipe of input'})
            return
        }

        const post= await Post.create({
            title,
            content,
            author: req.userId,
        })

        res.status(201).json({id: post._id})
    } catch (error) {
        res.status(500).send()
    }
}

export const postRouter= Router();

postRouter.get("/posts", getPosts);
postRouter.get("/posts/:id", getSinglePost)
postRouter.post('/posts', authenticate, createPost)