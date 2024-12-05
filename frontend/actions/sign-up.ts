"use server"
import { client } from "../lib/client"
import { handleAxiosError, ServerActionResponse } from "../lib/error-handling"
import { signUpschema, SignUpValues } from "../lib/schemas"
import {redirect} from 'next/navigation'

export const signUp =async(data: SignUpValues): Promise<ServerActionResponse>=> {
    const parsedData= signUpschema.parse(data)
    try {
        await client.post('/auth/sign-up', parsedData)
    } catch (error) {
        return handleAxiosError(error)
    }

    redirect('auth/log-in')
}