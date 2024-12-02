import { Document, model, MongooseError, Schema } from "mongoose";
import bcrypt from "bcrypt";

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

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    } 

    try {
        const hasehdPassword = await bcrypt.hash(this.password, 10)
        this.password=hasehdPassword

        next()

    } catch (error) {
        if (error instanceof MongooseError) {
            next(error)
        }
    }
})//MUST BE OLD STYLE ASYNC FUNCTION

export const User = model<UserTypes>('User', UserSchema)