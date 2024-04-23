import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { getCartItems, getProductById } from "@/lib/appwrite";
import { currentUser } from "@clerk/nextjs";
import { getImageUrls } from "@/lib/cloudinary";
import Checkout from "./Checkout";

export async function Cart() {
  const user = await currentUser();
  if (!user) return null;

  const cartItems = await getCartItems(`${user?.id}_@_${user?.emailAddresses[0].emailAddress}_@_${user?.firstName + ' ' +user?.lastName}`);
  const products = [];
  for (const item of cartItems) {
    const product = await getProductById(item);
    const images = getImageUrls(product?.images);
    products.push({
      product,
      images,
    });
  }

  if (products.length === 0)
    return (
      <Card className="w-full self-start mt-24">
        <CardHeader>
          <CardTitle>My Cart</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="text-center">Your cart is empty</div>
        </CardContent>
      </Card>
    );

  return (
    <Card className="w-full self-start mt-24">
      <CardHeader>
        <CardTitle>My Cart</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid gap-4">
          {products.map(({ product, images }) => (
            <div
              key={product?.$id}
              className="flex items-center gap-4 p-4 border-t border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-center gap-4">
                <img
                  alt="Thumbnail"
                  className="aspect-square rounded-lg object-cover"
                  height="100"
                  src={images[0]}
                  width="100"
                />
                <div className="grid gap-1.5">
                  <Link
                    className="line-clamp-2 font-medium hover:underline"
                    href={`/products/${product?.$id}`}
                  >
                    {product?.title}
                  </Link>
                  <div className="text-sm">${product?.discountedPrice}</div>
                </div>
              </div>
              <div className="ml-auto flex items-center gap-4">
                <Button size="icon" variant="outline">
                  <TrashIcon className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex items-start gap-4 py-4 border-t">
        <div className="grid gap-2 text-sm">
          <div>Subtotal</div>
          <div>Shipping</div>
          <div className="font-semibold">Total</div>
        </div>
        <form className="grid gap-2 ml-auto text-right">
          <div>
            $
            {products.reduce((acc, { product }) => {
              return acc + product?.discountedPrice;
            }, 0)}
          </div>
          <div>$500.00</div>
          <div className="font-semibold">
            $
            {products.reduce((acc, { product }) => {
              return acc + product?.discountedPrice;
            }, 500)}
          </div>
          <Checkout
            userId={`${user?.id}_@_${user?.emailAddresses[0].emailAddress}_@_${user?.firstName + ' ' +user?.lastName}`}
            totalPrice={products.reduce((acc, { product }) => {
              return acc + product?.discountedPrice;
            }, 500)}
          />
        </form>
      </CardFooter>
    </Card>
  );
}
