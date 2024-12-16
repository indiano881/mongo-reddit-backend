"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { postActionSchema, postValues } from "../../../lib/schemas";
import { useMutation } from "@tanstack/react-query";
import { handleServerActionError, toastServerError } from "../../../lib/error-handling";
import { createPost } from "../../../actions/create-post";

const CreatePostForm = () => {

    const {register, handleSubmit, formState: {errors}}= useForm<postValues>({ //in fromState we get acces to errors
        resolver: zodResolver(postActionSchema),
        mode: "onChange",
    })

    const {mutate, isPending}= useMutation({
        mutationFn: async(values: postValues)=> {
            handleServerActionError(await createPost(values))
        },
        onError: toastServerError
    })

    return (
        <form onSubmit={handleSubmit((values)=> mutate(values))} className="flex flex-col w-full gap-4">
            <input {...register('title')} type="text" placeholder="title" className="" />
            {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
            <textarea {...register('content')} placeholder='content' className="min-h-96 rounded-2xl"></textarea>
            {errors.content && (
                <p className="text-red-500 text-sm">{errors.content.message}</p>
            )}
            <button>{isPending ? 'Creating post' : 'Create post'}</button>


        </form>
    )
}

export default CreatePostForm;