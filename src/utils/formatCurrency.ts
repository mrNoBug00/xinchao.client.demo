// src/utils/formatCurrency.ts
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("zh-TW", {
    style: "currency",
    currency: "TWD",
  }).format(value);
};
