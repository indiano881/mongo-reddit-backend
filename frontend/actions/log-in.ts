"use server"
import {client} from '../lib/client'
import { redirect } from "next/navigation";
import { handleAxiosError, ServerActionResponse } from "../lib/error-handling"
import { logInSchema, logInValues } from "../lib/schemas"
import { auth } from '../lib/auth';

export const logIn= async(data: logInValues): Promise<ServerActionResponse>=> {

    const parsedData=logInSchema.parse(data);

    try {
        const response= await client.post('/auth/log-in', parsedData)
        console.log(response)
        if(!response.data.accessToken || response.data.accessToken !== 'string' ) {
            return {error: 'acces token missing'}
        }
        await auth.setAccessToken(response.data.accessToken)
    } catch (error) {
        return handleAxiosError(error)
    }

    redirect('/')
}