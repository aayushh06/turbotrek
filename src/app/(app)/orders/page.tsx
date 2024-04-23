import SingleOrder from "@/components/order";
import { getOrders, getProductById } from "@/lib/appwrite";
import { getImageUrls } from "@/lib/cloudinary";
import { currentUser } from "@clerk/nextjs";

export default async function Orders() {
  const user = await currentUser();
  if (!user) return null;

  const orders = await getOrders(`${user?.id}_@_${user?.emailAddresses[0].emailAddress}_@_${user?.firstName + ' ' +user?.lastName}`);

  if (orders.length === 0)
  return (
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="shadow-sm rounded-lg p-2 min-h-2xl flex items-center justify-center">
          <h1 className="text-2xl font-semibold">No orders yet</h1>
        </div>
      </main>
    );

  const products = [];
  for (const order of orders) {
    for (const item of order.products) {
      const product = await getProductById(item);
      const images = await getImageUrls(product?.images);
      products.push({
        product,
        images,
        totalPrice: order.totalPrice,
        date: new Date(order.$createdAt).toDateString(),
      });
    }
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="shadow-sm rounded-lg p-2">
        <div className="grid grid-cols-2 gap-4">
          {products.map((product, index) => (
            <SingleOrder key={index} order={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
