import { Product } from "@/actions/forms";
import { ProductsListing } from "@/components/products-listing";
import { getPaginatedProducts, getProducts } from "@/lib/appwrite";
import { Models, Query } from "appwrite";
import React from "react";

export const revalidate = 60;

async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = parseInt(searchParams.page as string) || 1;
  const category = (searchParams.category as string) || undefined;
  const query = category ? [Query.equal("categoryId", category)] : undefined;
  const products = await getPaginatedProducts(page, query);
  return (
    <ProductsListing
      products={products as Models.DocumentList<Models.Document>}
      category={category}
      page={page}
    />
  );
}

export default ProductsPage;
