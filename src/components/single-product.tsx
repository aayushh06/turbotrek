"use client";
import { Button } from "@/components/ui/button";
import { Models } from "appwrite";
import { useState } from "react";
import Image from "next/image";
import { addItemToCart } from "@/lib/appwrite";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function SingleProduct({
  product,
  userId,
  thumbs,
  images,
}: {
  product: Models.Document;
  userId: string | null;
  thumbs: string[];
  images: string[];
}) {
  const [currentImage, setCurrentImage] = useState(0);
  const router = useRouter();

  const handleAddToCart = async () => {
    // Add product to cart
    if (!userId) return;
    const tmp = toast.loading("Adding product to cart");
    const response = await addItemToCart(product.$id, userId);
    toast.success("Product added to cart");
    toast.dismiss(tmp);
  };

  return (
    <div className="grid h-full overflow-hidden md:grid-cols-2 items-start max-w-6xl px-4 mx-auto gap-6 lg:gap-12 py-6">
      <div className="grid md:grid-rows-2 gap-6 md:gap-10 items-start">
        <div className="flex flex-col md:hidden items-start">
          <div className="grid gap-4">
            <h1 className="font-bold text-2xl sm:text-3xl">{product.title}</h1>
            <div>
              <p>{product.description}</p>
            </div>
          </div>
          <div className="text-4xl flex flex-row gap-x-2 items-end font-bold">
            <p>₹{product.discountedPrice}</p>
            <p className="line-through text-xl font-thin">₹{product.price}</p>
          </div>
        </div>
        <div className="grid gap-4">
          <Image
            alt="Product Image"
            className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
            height={1800}
            src={images[currentImage]}
            width={1800}
          />
          <div className="hidden md:flex gap-4 items-start">
            {thumbs.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`
                    border
                    hover:border-gray-900
                    rounded-lg
                    overflow-hidden
                    transition-colors
                    dark:hover:border-gray-50
                    ${
                      currentImage === index
                        ? "border-gray-900"
                        : "border-gray-200"
                    }
                  `}
              >
                <Image
                  alt="Preview thumbnail"
                  className="aspect-square object-cover"
                  height={100}
                  src={image}
                  width={100}
                />
                <span className="sr-only">View Image {index + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 md:gap-4">
        <div className="grid gap-4 md:gap-10">
          <div className="hidden md:flex items-start">
            <div className="grid gap-4">
              <h1 className="font-bold text-2xl sm:text-3xl">
                {product.title}
              </h1>
              <div>
                <p>{product.description}</p>
              </div>
              <div className="text-4xl flex flex-row gap-x-2 items-end font-bold">
                <p>₹{product.discountedPrice}</p>
                <p className="line-through text-xl font-thin">
                  ₹{product.price}
                </p>
              </div>
            </div>
          </div>
          {/* <div className="grid gap-2">
            <Label className="text-base" htmlFor="color">
              Color
            </Label>
            <RadioGroup
              className="flex items-center gap-2"
              defaultValue="black"
              id="color"
            >
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="color-black"
              >
                <RadioGroupItem id="color-black" value="black" />
                Black
              </Label>
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="color-white"
              >
                <RadioGroupItem id="color-white" value="white" />
                White
              </Label>
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="color-blue"
              >
                <RadioGroupItem id="color-blue" value="blue" />
                Blue
              </Label>
            </RadioGroup>
          </div>
          <div className="grid gap-2">
            <Label className="text-base" htmlFor="size">
              Size
            </Label>
            <RadioGroup
              className="flex items-center gap-2"
              defaultValue="m"
              id="size"
            >
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="size-xs"
              >
                <RadioGroupItem id="size-xs" value="xs" />
                XS
              </Label>
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="size-s"
              >
                <RadioGroupItem id="size-s" value="s" />S
                {"\n                          "}
              </Label>
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="size-m"
              >
                <RadioGroupItem id="size-m" value="m" />M
                {"\n                          "}
              </Label>
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="size-l"
              >
                <RadioGroupItem id="size-l" value="l" />L
                {"\n                          "}
              </Label>
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="size-xl"
              >
                <RadioGroupItem id="size-xl" value="xl" />
                XL
              </Label>
            </RadioGroup>
          </div> */}
          {/* <div className="grid gap-2">
            <Label className="text-base" htmlFor="quantity">
              Quantity
            </Label>
            <Select defaultValue="1">
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
              </SelectContent>
            </Select>
          </div> */}
        </div>
        {!userId?.includes('undefined') ? (
          <Button size="lg" onClick={handleAddToCart}>
            {/* <Link href={"/cart"}>Add to cart</Link> */}
            Add to cart
          </Button>
        ): (
          <Button size="lg" onClick={() => router.push('/sign-up')}>
            {/* <Link href={"/cart"}>Add to cart</Link> */}
            Login to add to cart
          </Button>
        )}
      </div>
    </div>
  );
}
