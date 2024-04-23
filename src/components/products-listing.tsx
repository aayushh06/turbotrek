import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";
import { Product } from "@/actions/forms";
import { getImageUrl } from "@/lib/cloudinary";
import { Models } from "appwrite";
import { getCategories } from "@/lib/appwrite";
import { cn } from "@/lib/utils";
import ProductPagination from "./productPagination";

export function ProductsListing({
  products,
  category,
  page,
}: {
  products: Models.DocumentList<Models.Document>;
  category?: string | undefined;
  page: number;
}) {
  return (
    <div className="grid lg:grid-cols-12 lg:gap-6 items-start max-w-6xl px-4 mx-auto py-6">
      <ProductFilters category={category} />
      {products.documents?.length ? (
        <div className="lg:col-span-9 xl:col-span-9">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products?.documents?.map((product) => (
              <SingleProduct
                key={product.$id}
                product={product as unknown as Product}
              />
            ))}
          </div>
          <ProductPagination products={products} page={page} category={category}/>
        </div>
      ) : (
        <div className="lg:col-span-9 xl:col-span-9">
          <div className="flex items-center justify-center h-96">
            <h2 className="text-2xl font-semibold">No products found</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export const ProductFilters = async ({
  category,
}: {
  category?: string | undefined;
}) => {
  const categories = await getCategories();

  return (
    <div className="hidden sticky top-16 lg:block lg:col-span-3">
      <Card className="p-2">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid gap-4">
            <Card>
              <CardHeader className="rounded-t-none">
                <CardTitle>Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-1">
                  <Link
                    href="/products"
                    className={cn(
                      ["cursor-pointer hover:underline hover:text-blue-400"],
                      !category && "font-semibold text-violet-400"
                    )}
                  >
                    All Categories
                  </Link>
                  {categories.map((c) => (
                    <Link
                      key={c.$id}
                      href={`/products?category=${c.$id}`}
                      className={cn(
                        ["cursor-pointer hover:underline hover:text-blue-400"],
                        category === c.$id && "font-semibold text-violet-400"
                      )}
                    >
                      {c.title}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
            {/* <Card>
              <CardHeader className="rounded-t-none">
                <CardTitle>Price Range</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value="all">
                  <div className="grid gap-2">
                    <Label
                      className="cursor-pointer flex items-center gap-2"
                      htmlFor="price-all"
                    >
                      <RadioGroupItem id="price-all" value="all" />
                      All Prices
                    </Label>
                    <Label
                      className="cursor-pointer flex items-center gap-2"
                      htmlFor="price-0-50"
                    >
                      <RadioGroupItem id="price-0-50" value="0-50" />
                      $0.00 - $50.00
                    </Label>
                    <Label
                      className="cursor-pointer flex items-center gap-2"
                      htmlFor="price-50-100"
                    >
                      <RadioGroupItem id="price-50-100" value="50-100" />
                      $50.00 - $100.00
                    </Label>
                    <Label
                      className="cursor-pointer flex items-center gap-2"
                      htmlFor="price-100-500"
                    >
                      <RadioGroupItem id="price-100-500" value="100-500" />
                      $100.00 - $500.00
                    </Label>
                    <Label
                      className="cursor-pointer flex items-center gap-2"
                      htmlFor="price-500"
                    >
                      <RadioGroupItem id="price-500" value="500" />
                      $500.00 and above
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

function SingleProduct({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.$id}`}>
      <Card>
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            alt="Product image"
            className="object-cover aspect-none"
            height="500"
            src={getImageUrl(product.images[0], 500, 300)}
            width="500"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold line-clamp-2">{product.title}</h3>
          <p className="font-bold inline mr-2">${product.discountedPrice}</p>
          <p className="inline text-xs font-thin line-through">${product.price}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
