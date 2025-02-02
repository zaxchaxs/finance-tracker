import { Timestamp } from "firebase/firestore";
import { z } from "zod";

export interface UserDocType {
    userId: string;
    name: string;
    email: string;
    photoURL: string | null;
    createdAt: Timestamp
};

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

export const signUpSchema = z.object({
    name: z.string({
        message: "Name is required"
    }).min(1, {
        message: "Name is required"
    }),
    email: z.string({
        message: "Email is required"
    }).email({
        message: "Must be valid email!"
    }),
    password: z.string({
        message: "Password is required"
    }).min(4, {
        message: "Password should be more than 4 character"
    }),
    confirmPassword: z.string({
        message: "Password is required"
    }).min(1, {
        message: "Password is required"
    })
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});