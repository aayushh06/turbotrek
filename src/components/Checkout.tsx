"use client";
import { Button } from "./ui/button";

export default function Checkout({
  userId,
  totalPrice,
}: {
  userId: string | null;
  totalPrice: number;
}) {
  return <Button onClick={(e) => {
    e.preventDefault();
    window.location.href = "/checkout?userId=" + userId + "&totalPrice=" + totalPrice;
  }}>Checkout</Button>;
}
