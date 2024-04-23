import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import Image from "next/image";
import { Badge } from "./ui/badge";
import Link from "next/link";

function SingleOrder({ order }: { order: any }) {
  return (
    <Card className="flex flex-row items-center justify-between w-full">
      <span className="flex items-center">
        <CardHeader>
          <Image
            alt="Product thumbnail"
            height={100}
            src={order.images[0]}
            width={100}
          />
        </CardHeader>
        <CardContent className="p-4 flex">
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold">{order.product.title}</h3>
            <span className="text-sm">{order.date}</span>
          </div>
        </CardContent>
      </span>
      <CardFooter className="flex-col mt-6">
        <Badge color="success" className="self-end">
          <Link href="/orders/3210">Shipped</Link>
        </Badge>
        <p className="font-bold text-3xl">₹ {order.totalPrice}</p>
      </CardFooter>
    </Card>
  );
}

export default SingleOrder;
