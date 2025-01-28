export const currencyFormat = (amount: number, currency: string) => {
    return new Intl.NumberFormat(["en", "EN"], {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };