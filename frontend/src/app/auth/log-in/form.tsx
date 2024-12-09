"use client";

import { useForm } from "react-hook-form";
import { logInSchema, logInValues } from "../../../../lib/schemas";
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from "@tanstack/react-query";
import { handleServerActionError, toastServerError } from "../../../../lib/error-handling";

import { logIn } from "../../../../actions/log-in";


const LogInForm = () => {
    const { mutate, isPending } = useMutation({ //add isPending????
        mutationFn: async (values: logInValues) => {
            handleServerActionError(await logIn(values));
        },
        onError: toastServerError
    });

    const { register, handleSubmit, formState: { errors } } = useForm<logInValues>({
        resolver: zodResolver(logInSchema),
        mode: "onChange", // Enables real-time validation feedback
    });

    return (
        <form
            onSubmit={handleSubmit((values) => mutate(values))}
            className="flex w-full max-w-md flex-col gap-4"
        >
            <input
                {...register("username")}
                type="text"
                placeholder="Username"
                className={`input ${errors.username ? "border-red-500" : ""}`}
            />
            {errors.username && (
                <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}

            <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className={`input ${errors.password ? "border-red-500" : ""}`}
            />
            {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            <button
                type="submit"
                disabled={isPending }
                className={`btn ${isPending ? "opacity-50" : ""}`}
            >
                {isPending ? "Logging in..." : "Log In"}
            </button>
        </form>
    );
};

export default LogInForm;
