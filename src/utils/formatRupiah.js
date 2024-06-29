export const formatRupiah = money => {
    return new Intl.NumberFormat("in-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(money);
  };