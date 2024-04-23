import { SingleProduct } from "@/components/single-product";
import { getProductById } from "@/lib/appwrite";
import { getImageUrls } from "@/lib/cloudinary";
import { currentUser } from "@clerk/nextjs";
import { Models } from "appwrite";
import React from "react";

async function SingleProductPage({ params }: { params: { id: string } }) {
  const product = (await getProductById(params.id)) as Models.Document;
  const user = await currentUser();
  const thumbs = getImageUrls(product.images, 200, 200);
  const images = getImageUrls(product.images, 1600, 1600);
  return <SingleProduct product={product} images={images} thumbs={thumbs} userId={`${user?.id}_@_${user?.emailAddresses[0].emailAddress}_@_${user?.firstName + ' ' +user?.lastName}`!}/>;
}

export default SingleProductPage;
