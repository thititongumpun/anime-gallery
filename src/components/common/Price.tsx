import React from "react";

type Props = {
  amount: number;
};

export default function Price({ amount }: Props) {
  const formatted = new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
  return <p className="text-md">{formatted}</p>;
}
