import { Router, type Request, type Response } from "express";
import { Post } from "../models/posts";
import { authenticate } from "../middlewares/authenticate";
import { isValidObjectId, ObjectId } from "mongoose";

type AuthorUsernmaneConversionType = {
    _id: ObjectId,
    username: string
}

const getPosts= async ( req: Request, res: Response) => {
    try {
        const posts= await Post.find().populate('author', 'username')
        
        res.status(200).json(posts.map((post)=> {
            const author= post.author as unknown as AuthorUsernmaneConversionType;
            return {
                id: post._id,
                title: post.title,
                author: {
                    username: author.username,
                }
            }
        }))
    } catch (error) {
        res.status(500).send()
    }
        
}

const getSinglePost= async (req: Request, res: Response)=> {
    try {
        const {id}= req.params;

        if (!isValidObjectId(id)) {
            res.status(404).json({message: "invalid post id"})
        }
        const post = await Post.findById(id).populate('author', 'username')

        if (!post) {
            res.status(404).json({message: 'post not found'})
        }
        const author= post?.author as unknown as AuthorUsernmaneConversionType;
        res.status(200).json({
            id:post?._id,
            title: post?.title,
            content: post?.content,
            author: {
                id: post?.author.id,
                username: author.username
            }
        })
    } catch (error) {
        res.status(500).send()
    }
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

const deletePost= async(req: Request, res: Response)=> {
    try{
        const {id}= req.params;

        if (!isValidObjectId(id)) {
            res.status(404).json({message: "invalid post id"})
            return
        }

        const post= await Post.findById(id)

        if (!post) {
            res.status(404).json({message: 'post already deleted or not founded'})
            return
        }

        if (post.author.toString() !==req.userId) {
            res.status(403).json({message: "you are not authorized to do this action"})
            return
        }

        await post.deleteOne()
        res.status(200).json({message: 'post deleted'})

    } catch(error) {
        res.status(500).send()
    }
}

const editPost = async(req: Request, res: Response)=> {
    try {
        const {id}= req.params;
        if (!isValidObjectId(id)) {
            res.status(404).json({message: "invalid post id"})
            return
        }
        const post= await Post.findById(id);

        if (!post) {
            res.status(404).json({message: 'post already deleted or not founded'})
            return
        }

        if (post.author.toString() !==req.userId) {
            res.status(403).json({message: "you are not authorized to do this action"})
            return
        }

        const {title, content}= req.body;

        if (title !==undefined && typeof title !== 'string') {
            res.status(400).json({message: 'not valid tipe of input'})
            return
        }
        if (content !== undefined && typeof content !== 'string') {
            res.status(400).json({message: 'not valid tipe of input'})
            return
        }

        await post.updateOne({
            title,
            content
        })

        res.status(200).json({message: 'post updated'})

    } catch (error) {
        res.status(500).send()
        
    }
}
export const postRouter= Router();

postRouter.get("/posts", getPosts);
postRouter.get("/posts/:id", getSinglePost)
postRouter.post('/posts', authenticate, createPost)
postRouter.delete('/posts/:id', authenticate, deletePost)
postRouter.put('/posts/:id', authenticate, editPost)