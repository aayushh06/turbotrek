import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div className="flex h-screen">
        <main className="flex-1 md:p-8 pt-2 p-8">
          <Navbar />
          {children}
        </main>
      </div>
      <Toaster richColors />
    </main>
  );
}
