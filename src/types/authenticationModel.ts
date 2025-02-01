import { z } from "zod";

export const signInSchema = z.object({
    email: z.string({
        message: "Email is required"
    }).email({
        message: "Must be valid email!"
    }),
    password: z.string({
        message: "Password is required"
    }).min(1, {
        message: "Password is required"
    })
});

