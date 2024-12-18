export const currencyFormat = (money: number, currency: string) => {
    return new Intl.NumberFormat(["en", "id"], {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
    }).format(money);
  };