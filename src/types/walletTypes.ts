import { z } from 'zod';

export interface WalletType {
    accoundId: string;
    balance: number;
    name: string;
    userId: string;
    createdAt: string;
    currency: string;
}

export const addWalletSchema = z.object({
    name: z.string({
        message: "Name is required."
    }).min(3, {
        message: "Name must be at least 3 characters long."
    }),
    currency: z.string({message: "Currency is required."}),
    balance: z.string({ message: "Balance must be a valid number." }),
    icon: z.string({message: "Icon is required."})
})