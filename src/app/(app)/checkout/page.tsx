"use client";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BoxIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { checkout } from "@/lib/appwrite";
import { toast } from "sonner";

export default function Checkout() {
  const params = useSearchParams();
  const userId = params.get("userId");
  const totalPrice = Number(params.get("totalPrice"));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Extract form data
    const formData = new FormData(event.target as HTMLFormElement);
    const shippingInfo = {
      name: formData.get('name'),
      email: formData.get('email'),
      address: formData.get('address'),
      city: formData.get('city'),
      zip: formData.get('zip'),
    };
    const paymentInfo = {
      name: formData.get('name2'),
      cardNumber: formData.get('number2'),
      expirationMonth: formData.get('month2'),
      expirationYear: formData.get('year2'),
      cvc: formData.get('cvc2'),
    };

    // Additional validation can be done here

    // Perform checkout
    const tmp = toast.loading("Placing order...");
    const res = await checkout(userId!, totalPrice);
    toast.dismiss(tmp);
    if (res) {
      window.location.href = "/success";
      toast.success("Order placed successfully!");
    } else {
      toast.error("Failed to place order.");
    }
  };

  if (!userId || !totalPrice) {
    return (
      <div className="grid gap-4 lg:gap-8 items-start p-4 lg:p-6 border-t lg:border-t-0 border-gray-200 w-full min-h-screen aspect-1/1 dark:border-gray-800 lg:grid-cols-3">
        Can&apos;t be accessed directly.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 lg:gap-8 items-start p-4 lg:p-6 border-t lg:border-t-0 border-gray-200 w-full min-h-screen aspect-1/1 dark:border-gray-800 lg:grid-cols-3">
      <Card className="w-full lg:col-span-2 max-w-3xl">
        <CardHeader>
          <CardTitle>Shipping information</CardTitle>
          <CardDescription>Enter your shipping details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="Enter your name" required/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" placeholder="Enter your email" type="email" required/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input id="address" name="address" placeholder="Enter your address" required/>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" placeholder="Enter your city" required/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip">ZIP code</Label>
              <Input id="zip" name="zip" placeholder="Enter your ZIP code" required/>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full max-w-3xl sticky top-16">
        <CardFooter className="flex flex-col gap-2 sm:flex-row sm:gap-4 mt-6">
          <Button type="submit" size="lg">
            Place order
          </Button>
        </CardFooter>
      </Card>
      <Card className="w-full max-w-3xl lg:col-span-2">
        <CardHeader>
          <CardTitle>Payment</CardTitle>
          <CardDescription>Enter your payment information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name2">Name</Label>
            <Input id="name2" name="name2" placeholder="Enter your name" required/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="number2">Card number</Label>
            <Input id="number2" name="number2" placeholder="Enter your Card number" type="number" required/>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="month2">Expires</Label>
              <Select required name="month2">
                <SelectTrigger aria-label="Month" id="month2">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">January</SelectItem>
                  <SelectItem value="2">February</SelectItem>
                  <SelectItem value="3">March</SelectItem>
                  <SelectItem value="4">April</SelectItem>
                  <SelectItem value="5">May</SelectItem>
                  <SelectItem value="6">June</SelectItem>
                  <SelectItem value="7">July</SelectItem>
                  <SelectItem value="8">August</SelectItem>
                  <SelectItem value="9">September</SelectItem>
                  <SelectItem value="10">October</SelectItem>
                  <SelectItem value="11">November</SelectItem>
                  <SelectItem value="12">December</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="year2">Year</Label>
              <Select required name="year2">
                <SelectTrigger aria-label="Year" id="year2">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2025">2025</SelectItem>
                  <SelectItem value="2026">2026</SelectItem>
                  <SelectItem value="2027">2027</SelectItem>
                  <SelectItem value="2028">2028</SelectItem>
                  <SelectItem value="2029">2029</SelectItem>
                  <SelectItem value="2030">2030</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvc2">CVC</Label>
              <Input id="cvc2" name="cvc2" placeholder="CVC" required/>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
