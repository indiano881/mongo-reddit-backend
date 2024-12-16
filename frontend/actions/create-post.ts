'use server'

import { postActionSchema, postValues } from "../lib/schemas";
import { auth } from "../lib/auth";
import { handleAxiosError } from "../lib/error-handling";
import { client } from "../lib/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const createPost= async(data: postValues)=> {
    const parseData= postActionSchema.parse(data);

    const accessToken= await auth.getAccessToken()

    if (!accessToken) {
        return {error: 'need to log in to do this action'}
    }

    let id;

    try {
        const response= await client.post('/posts', parseData, {
            headers: {
                Authorization: `Bearer ${accessToken.value}`
            }
        })

        id= response.data.id
    } catch (error) {
        return handleAxiosError(error)
    }

    if(!id || typeof id !== 'string') {
        return {error: 'could not redirect to new post'}
    }

    revalidatePath('/')
    redirect(`/posts/${id}`)
}