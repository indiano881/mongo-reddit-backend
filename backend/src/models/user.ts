import { Document, model, Schema } from "mongoose";

type UserTypes= Document & {
    username: string,
    password: string,
    createdAt: Date,
    updatedAt: Date
}

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false, //is false because is a sensitive info
    }
},
{
    timestamps:true
}
)

export const User = model<UserTypes>('User', UserSchema)