import { Button } from "@/components/ui/button";
import {
  PaginationPrevious,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationContent,
  Pagination,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { getCategories, getProducts } from "@/lib/appwrite";
import { getImageUrls } from "@/lib/cloudinary";
import { EditProductModal } from "../modals";
import { Product } from "@/actions/forms";
import { Globe, Pencil } from "lucide-react";
import { DeleteBtn } from "./button";
import Image from "next/image";
import Link from "next/link";

export default async function ProductTablePage() {
  const products = await getProducts();
  const images = getImageUrls(
    products.map((product) => product.images[0])
  );
  const categories = await getCategories();
  return (
    <>
      <Table className="rounded">
        <TableHeader className="bg-gray-50 dark:bg-gray-800">
          <TableRow>
            <TableHead>Item</TableHead>
            <TableHead>Discounted Price</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Model</TableHead>
            {/* <TableHead>Is Sold</TableHead> */}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={product.$id}>
              <TableCell>
                <div className="flex items-center">
                  <div className="grid aspect-square h-10 overflow-hidden rounded-full">
                    <Image
                      alt="Product"
                      height={60}
                      src={images[index]}
                      style={{
                        objectFit: "cover",
                      }}
                      width={60}
                    />
                  </div>
                  <div className="ml-4">{product.title}</div>
                </div>
              </TableCell>
              <TableCell>₹{product.discountedPrice}</TableCell>
              <TableCell>₹{product.price}</TableCell>
              <TableCell>
                {
                  categories?.find(
                    (category) => category.$id === product.categoryId
                  )?.title
                }
              </TableCell>
              <TableCell>{product.model}</TableCell>
              {/* <TableCell>
                <Switch id={`is-sold-${product.$id}`} />
              </TableCell> */}
              <TableCell className="px-6 space-x-3 py-4 whitespace-nowrap text-sm font-medium">
                <Button size="sm" variant="secondary">
                  <Globe className="h-3 w-3 mr-2" />
                  <Link href={`/products/${product.$id}`}>View on site</Link>
                </Button>
                {/* <EditProductModal product={product as unknown as Product}>
                  <Button size="sm" variant="outline">
                    <Pencil className="h-3 w-3 mr-2" />
                    Edit
                  </Button>
                </EditProductModal> */}
                <DeleteBtn product={product as unknown as Product} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination className="w-full">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
