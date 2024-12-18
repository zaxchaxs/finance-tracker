import { ConvertedSumTransactionData } from "@/types/common";
import { TransactionType } from "@/types/transactionTypes";

export const yearDataFilter = (data, year) => {
    const yearFiltered = data?.filter(obj => {
        ;

        // toDate() is firestore method for timmestamp. Inget ya
        const date = new Date(obj.date.toDate());
        return year === date.getFullYear();
    });

    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // buat 12 custom array of object
    const newData = Array(12).fill(null).map((_, idx) => ({
        name: monthNames[idx],
        income: 0,
        expanse: 0

    }));

    yearFiltered?.forEach(transaction => {
        // toDate() is firestore method for timmestamp. Inget ya
        const date = new Date(transaction.date.toDate());
        const monthIdx = date.getMonth();

        if (transaction.type === 'income') {
            newData[monthIdx].income += transaction.amount
        } else if (transaction.type === 'expanse') {
            newData[monthIdx].expanse += transaction.amount
        }
    });
    return newData;
};

export const monthDataFilter = (data, month, year) => {

    const monthFiltered = data?.filter(obj => {

        // toDate() is firestore method for timmestamp. Inget ya
        const date = new Date(obj.date.toDate());
        return date.getMonth() === month && date.getFullYear() === year;
    });

    // create days in every month. anjai juga ini baru tau.
    const getDaysInMonth = (inYear, inMonth) => {
        return new Date(inYear, inMonth + 1, 0).getDate();
    };
    // console.log(getDaysInMonth(year, month));
    const numOfDays = getDaysInMonth(year, month);
    const newData = Array(numOfDays).fill(null).map((_, idx) => ({
        name: idx + 1,
        income: 0,
        expanse: 0
    }));

    monthFiltered?.forEach(transac => {
        // toDate() is firestore method for timmestamp. Inget ya
        const date = new Date(transac.date.toDate());
        const dateIdx = date.getDate() - 1;

        if (transac.type === 'income') {
            newData[dateIdx].income += transac.amount
        } else if (transac.type === 'expanse') {
            newData[dateIdx].expanse += transac.amount
        }
    });

    return newData;
};

export const todayConvertingTransactions = (transactions?: TransactionType[]): ConvertedSumTransactionData[] | null => {
    if(!transactions || transactions.length < 0) return null;

    const newData:ConvertedSumTransactionData[] = [{
        dataKey: "Income/Expanse",
        income: 0,
        expanse: 0
    }]
    transactions.forEach(transaction => {
        if (transaction.type == "income") {
            newData[0].income += transaction.amount;
        } else if (transaction.type == "expanse") {
            newData[0].expanse += transaction.amount;
        }
    })

    // console.log(newData);
    return newData;
}

export const weekConvertingTransactions = (transactions?: TransactionType[]): ConvertedSumTransactionData[] | null => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    if (!transactions || transactions.length < 0) return null;

    const newData: ConvertedSumTransactionData[] = Array(days.length).fill(null).map((_, idx) => ({
        dataKey: days[idx],
        income: 0,
        expanse: 0
    }));

    transactions.forEach(transaction => {
        const transactionDay = transaction.date.toDate().getDay();
        if (transaction.type == "income") {
            newData[transactionDay].income += transaction.amount;
        } else if (transaction.type == "expanse") {
            newData[transactionDay].expanse += transaction.amount;
        }
    })

    // console.log(newData);
    return newData;
}

// const convertTimestampToTime = (seconds: number, nanoseconds: number) => {
//     const milliseconds = seconds * 1000 + nanoseconds / 1e6;
//     const date = new Date(milliseconds);

//     // return date.toLocaleTimeString("en-US", {
//         // hour: "2-digit",
//         // minute: "2-digit"
//     });
//   };