import { WalletType } from '@/types/walletTypes';
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
    const newDate = date.toDate();
    return newDate.toLocaleDateString("en-EN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
}

export const currencyFormat = (amount: number, currency: string) => {
    return new Intl.NumberFormat(["en", "EN"], {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  export const monthConvert = (index: number) => {
    const months = [
        { idx: 0, name: 'Jan' },
        { idx: 1, name: 'Feb' },
        { idx: 2, name: 'Mar' },
        { idx: 3, name: 'Apr' },
        { idx: 4, name: 'May' },
        { idx: 5, name: 'Jun' },
        { idx: 6, name: 'Jul' },
        { idx: 7, name: 'Aug' },
        { idx: 8, name: 'Sep' },
        { idx: 9, name: 'Oct' },
        { idx: 10, name: 'Nov' },
        { idx: 11, name: 'Dec' },
      ];

    const foundedMonth = months.find(el => el.idx === index);
    return foundedMonth?.name;
}

export const sumTotalTransaction = (data: { name: string; income: number; expanse: number }[], wallet: string) => {
    const parsedWallet:WalletType = JSON.parse(wallet);

    const result = data.reduce(
      (acc, curr) => ({
        income: acc.income + curr.income,
        expanse: acc.expanse + curr.expanse,
      }),
      { income: 0, expanse: 0 }
    );
    
    return {
        income: currencyFormat(result.income, parsedWallet.currency),
        expanse: currencyFormat(result.expanse, parsedWallet.currency),
      };
  };