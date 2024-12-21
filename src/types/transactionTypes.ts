import { Timestamp } from "firebase/firestore";
import { z } from "zod";

export interface TransactionType {
    accountId: string;
    amount: number;
    createdAt: Timestamp;
    date: Timestamp;
    description: string;
    name: string;
    type: "income" | "expanse";
    userId: string;
    currency: string;
}

export const addTransactionSchema = z.object({
    walletId: z.string({
        message: "Wallet is required"
    }),
    date: z.string({
        message: "Date is required"
    }),
    type: z.string({
        message: "Type of transaction is required"
    }),
    amount: z.string({
        message: "Amount of transaction is required"
    }).min(1, {
        message: "Amount of transaction is required"
    }),
    description: z.string({
        message: ""
    }).optional()
})