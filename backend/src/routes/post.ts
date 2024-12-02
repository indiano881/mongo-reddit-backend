import { Router, type Request, type Response } from "express";

const getPosts= async ( req: Request, res: Response) => {

    res.status(200).json([{title: "hello from post.ts"}, {title: "hello AgAIN post.ts"}])
    
}

const getSinglePost= async (req: Request, res: Response)=> {

    const {id}= req.params

    res.status(200).json([{title: "hello from SINGLE POST post.ts", id}])
    console.log(req)
}

export const postRouter= Router();

postRouter.get("/posts", getPosts);
postRouter.get("/posts/:id", getSinglePost)