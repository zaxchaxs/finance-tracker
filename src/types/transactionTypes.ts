import { Timestamp } from "firebase/firestore";

export interface TransactionType {
    accountId: string;
    amount: number;
    createdAt: Timestamp;
    date: Timestamp;
    description: string;
    name: string;
    type: "income" | "expanse";
    userId: string;
}