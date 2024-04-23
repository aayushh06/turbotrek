import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllOrders, getCategories, getProductById } from "@/lib/appwrite";
import { getImageUrls } from "@/lib/cloudinary";
import Image from "next/image";

export default async function OrdersTablePage() {
  const orders = await getAllOrders();
  const firstProducts = await Promise.all(
    orders.map((order) => getProductById(order.products[0]))
  );
  const images = getImageUrls(
    firstProducts.map((product) => product?.images[0])
  );
  return (
    <Table className="rounded">
      <TableHeader className="bg-gray-50 dark:bg-gray-800">
        <TableRow>
          <TableHead>Items</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Ordered by</TableHead>
          <TableHead>Ordered on</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order, index) => (
          <TableRow key={order.$id}>
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
                <div className="ml-4">
                  {firstProducts[index]?.title}
                  {order.products.length > 1 &&
                    ` + ${order.products.length - 1} more`}
                </div>
              </div>
            </TableCell>
            <TableCell>₹{order.totalPrice}</TableCell>
            <TableCell>
              {order.userId.split("_@_")[2]}
              <small className="block">{order.userId.split("_@_")[1]}</small>
            </TableCell>
            <TableCell>
              {new Date(order.$createdAt).toDateString()}
              <small className="block">
                {new Date(order.$createdAt).toLocaleTimeString()}
              </small>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
