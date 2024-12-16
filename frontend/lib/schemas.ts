import { title } from 'process';
import z from 'zod';

export const signUpschema= z.object({
    username: z.string().min(3, 'username must have at least 3 characters'),
    password: z.string().min(5, 'min 5 character')
})

export type SignUpValues= z.infer<typeof signUpschema>;

export const logInSchema= z.object({
    username: z.string().min(1, 'username is required'),
    password: z.string().min(1, 'password is required')
})

export type logInValues= z.infer<typeof logInSchema>

export const postActionSchema= z.object({
    title: z.string().min(1, " title is required"),
    content: z.string().optional()
})

export type postValues= z.infer<typeof postActionSchema>

export const profileSchema= z.object({
    username: z.string(),
    id: z.string()
})

export type ProfileValues= z.infer<typeof profileSchema>