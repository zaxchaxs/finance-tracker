import { Parser } from '@json2csv/plainjs';
import { Timestamp } from "firebase/firestore";

export const convertJSONToCSV = (data: any[]): string => {
    try {
        const parser = new Parser();
        return parser.parse(data);
    } catch (error) {
        console.error("Error converting to CSV:", error);
        return "";
    }
};

export const firestoreDateToString = (date: Timestamp): string => {
    return new Date(date.toDate()).toDateString();
}