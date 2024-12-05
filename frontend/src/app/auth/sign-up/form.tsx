"use client";

import { useForm } from "react-hook-form";
import { signUpschema, SignUpValues } from "../../../../lib/schemas";
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from "@tanstack/react-query";
import { handleServerActionError } from "../../../../lib/error-handling";
import { signUp } from "../../../../actions/sign-up";
import { toast } from "sonner";

const SignUpForm = () => {
    const { mutate } = useMutation({
        mutationFn: async (values: SignUpValues) => {
            handleServerActionError(await signUp(values));
        },
        onError: (error) => toast.error(error.message),
    });

    const { register, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm<SignUpValues>({
        resolver: zodResolver(signUpschema),
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
                disabled={isSubmitting || !isValid}
                className={`btn ${isSubmitting ? "opacity-50" : ""}`}
            >
                {isSubmitting ? "Submitting..." : "Sign Up"}
            </button>
        </form>
    );
};

export default SignUpForm;
