"use client";

import { Models } from "appwrite";
import { Button } from "./ui/button";
import { ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";
import { Router } from "next/router";

export default function ProductPagination({
  products,
  page,
  category,
}: {
  products: Models.DocumentList<Models.Document>;
  page: number;
  category?: string | undefined;
}) {
  return (
    <div className="flex items-center justify-between mt-4 flex-col md:flex-row">
      <div className="text-sm flex items-center gap-1 dark:text-gray-400">
        <span className="font-medium">
          Showing 1 to {products.documents.length} of {products.total} products
        </span>
      </div>
      <div className="flex gap-2 md:gap-4">
        <Button
          className="rounded-full"
          size="icon"
          variant="outline"
          onClick={() => {
            if (page > 1) {
              if (category) {
                window.location.replace(
                  `/products?page=${page - 1}&category=${category}`
                );
              } else {
                window.location.replace(`/products?page=${page - 1}`);
              }
            }
          }}
        >
          <ChevronsLeftIcon className="h-4 w-4" />
          <span className="sr-only">Previous</span>
        </Button>
        <Button
          className="rounded-full"
          size="icon"
          variant="outline"
          onClick={() => {
            if (page < Math.ceil(products.total / 25))
              if (category) {
                window.location.replace(
                  `/products?page=${page + 1}&category=${category}`
                );
              } else {
                window.location.replace(`/products?page=${page + 1}`);
              }
          }}
        >
          <ChevronsRightIcon className="h-4 w-4" />
          <span className="sr-only">Next</span>
        </Button>
      </div>
    </div>
  );
}
