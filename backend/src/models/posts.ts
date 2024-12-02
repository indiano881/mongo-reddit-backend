import { Schema, Document, Types, model } from "mongoose";

type CommentTypes= Document & {
    content: string,
    author: Types.ObjectId,
    createdAt: Date,
    updatedAt: Date
}

type PostTypes= Document & {
    title: string,
    content?: string,
    author: Types.ObjectId,
    comments: [CommentTypes],
    upvotes: Types.ObjectId[],
    downvotes: Types.ObjectId[],
    score: number,
    createdAt: Date,
    updatedAt: Date
}

const commentSchema = new Schema(
    {
        content: {
            type: String,
            required: true
        }, 
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true,
    }
    
)

const postSchema= new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: [commentSchema],
    upvotes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    downvotes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    score: {
        type: Number,
        default: 0,
    }
},
{
    timestamps: true
})

export const Post= model<PostTypes>('Post', postSchema)
export const Comment= model<CommentTypes>('Comment', commentSchema)