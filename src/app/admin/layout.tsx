import Link from "next/link";
import TabItems from "./tabs";
import { currentUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export const revalidate = 30;

export default async function Layout({
  forms,
  products,
  orders,
  scheduled,
}: // files,
{
  forms: React.ReactNode;
  products: React.ReactNode;
  orders: React.ReactNode;
  scheduled: React.ReactNode;
  // files: React.ReactNode;
}) {
  const user = await currentUser();
  const isAdmin = user?.privateMetadata?.role === "admin";

  if (!isAdmin) {
    return (
      <div className="flex-1 h-screen flex flex-col gap-2 justify-center items-center">
        <span>You are not authorized to view this page</span>
        <Button asChild>
          <Link href="/">
            <Home size={12} className="mr-2" />
            Go to Home
          </Link>
        </Button>
      </div>
    );
  }
  return (
    <TabItems
      items={[
        [forms, "forms"],
        [products, "products"],
        [orders, "orders"],
        [scheduled, "scheduled"],
      ]}
    />
  );
}
