export const formatAmount = (amount) => {
  if (!amount) return "-";

  return Number(amount).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });
};
