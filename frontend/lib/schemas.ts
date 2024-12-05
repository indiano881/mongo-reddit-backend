import z from 'zod';

export const signUpschema= z.object({
    username: z.string().min(3, 'username must have at least 3 characters'),
    password: z.string().min(5, 'min 5character')
})

export type SignUpValues= z.infer<typeof signUpschema>;