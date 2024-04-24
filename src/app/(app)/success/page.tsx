"use client";
import React, { useState } from 'react';
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Centered from "@/components/global/Centered";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

function DateTimeDisplay() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Format the date and time
  const formattedDateTime = currentDateTime.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return <div className="ml-auto">{formattedDateTime}</div>;
}

export default function Success() {
  function generateRandomNumber() {
    return Math.floor(1000 + Math.random() * 9000);
  }
  let orderNumber = generateRandomNumber();

  return (
    <Centered>
      <Card className="mx-auto max-w-sm">
        <CardHeader className="flex flex-col space-y-3 items-center">
          <CheckCircle className="h-32 w-32 text-green-500" />
          <CardTitle>Order Placed</CardTitle>
          <CardDescription>
            Your order has been successfully placed.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center gap-2">
            <div className="font-medium">Order number</div>
            <div className="ml-auto">#{orderNumber}</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="font-medium">Date & Time</div>
            <DateTimeDisplay />
          </div>
          {/* <div className="flex items-center gap-2">
            <div className="font-medium">Shipping address</div>
            <div className="ml-auto">
              1234 Main St. Anytown, CA 12345, United States
            </div>
          </div> */}
        </CardContent>
        <CardFooter>
          <Button className="w-full"><Link href={'/orders'}>Go to orders</Link></Button>
        </CardFooter>
      </Card>
    </Centered>
  );
}
