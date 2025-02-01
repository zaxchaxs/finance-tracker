import { WalletType } from "@/types/walletTypes";
import { currencyFormat } from "./currencyFormat";

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
  