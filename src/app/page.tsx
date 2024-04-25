import Navbar from "@/components/Navbar";
import { ChevronRightIcon, Star, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ScheduleTestDrive } from "@/components/forms";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <section className="w-full py-6 sm:py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="sm:w-full lg:order-last flex flex-col justify-center -my-16">
                <Image
                  src="/bg.png"
                  alt="Placeholder"
                  className="lg:scale-150 relative lg:right-32"
                  width={600}
                  height={600}
                />
              </div>
              <div className="flex flex-col justify-center text-center items-center lg:text-left lg:items-baseline space-y-4">
                <div className="space-y-4">
                  <h1 className="text-3xl font-bold sm:text-5xl xl:text-6xl/none text-balance">
                    Drive Your Dreams Home with US
                  </h1>
                  <p className="max-w-[600px] text-balance text-neutral-500 md:text-xl dark:text-neutral-400">
                    Simplify your car purchase with our flexible financing
                    options tailored to suit your individual needs and
                    preferences seamlessly.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    className="inline-flex w-full max-w-xs h-10 items-center justify-center rounded-md bg-neutral-900 px-8 text-sm font-medium text-neutral-50 shadow transition-colors hover:bg-neutral-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90 dark:focus-visible:ring-neutral-300"
                    href="/products"
                  >
                    View Products
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-neutral-100 px-3 py-1 text-sm dark:bg-neutral-800">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Faster iteration. More innovation.
                </h2>
                <p className="max-w-[900px] text-neutral-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-neutral-400">
                  Simplify your car purchase with our flexible financing options
                  tailored to suit your individual needs and preferences
                  seamlessly.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-10">
              <div className="mx-auto aspect-video overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-xl object-cover object-center sm:w-full lg:order-last">
                <Image
                  src="/banner.jpg"
                  width={600}
                  height={400}
                  alt="Banner"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">
                        Effortless Car Buying:
                      </h3>
                      <p className="text-neutral-500 dark:text-neutral-400">
                        Streamlined browsing experience with intuitive search
                        filters.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">
                        Comprehensive Vehicle Listings:
                      </h3>
                      <p className="text-neutral-500 dark:text-neutral-400">
                        Diverse inventory showcasing new models and certified
                        pre-owned cars.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">
                        Expert Support and Guidance:
                      </h3>
                      <p className="text-neutral-500 dark:text-neutral-400">
                        Dedicated customer service team available to assist at
                        every stage.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-6 md:py-12 lg:py-16">
          <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 xl:gap-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold md:text-4xl/tight">
                Find your next car with confidence
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Browse our wide selection of vehicles and connect with our team
                for personalized assistance.
              </p>
            </div>
            <div className="flex flex-col gap-4 min-[400px]:flex-row lg:justify-end lg:gap-2">
              <Link
                className="inline-flex items-center justify-center h-10 rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm gap-1 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-950 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                href="/products"
              >
                View Products
                <ChevronRightIcon className="w-4 h-4" />
              </Link>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="inline-flex items-center justify-center h-10 rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow gap-1 transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
                    Schedule a test drive
                  </Button>
                </AlertDialogTrigger>
                <ScheduleTestDrive />
              </AlertDialog>
            </div>
          </div>
        </section>

        <div className="px-10 md:px-28 py-14">
          <h3 className="text-center font-extrabold text-2xl underline decoration-4 decoration-primary underline-offset-8">
            Testimonials
          </h3>
          <div className="flex flex-col md:flex-row justify-between py-10 gap-8">
            <div className="md:w-1/3 p-5 shadow-lg rounded-2xl space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center h-12 w-12">
                  <User />
                </div>
                <label className="font-semibold">Mark T</label>
              </div>
              <p>
                I&apos;ve owned several cars, but my Audi has been the epitome
                of reliability and performance. Whether it&apos;s a daily
                commute or a weekend getaway, my Audi never fails to impress
              </p>
              <div className="flex">
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </div>
            </div>
            <div className="md:w-1/3 p-5 shadow-lg rounded-2xl space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center h-12 w-12">
                  <User />
                </div>
                <label className="font-semibold">Sarah M</label>
              </div>
              <p>
                Driving an Audi is like experiencing pure luxury on wheels. From
                its sleek design to its powerful performance, every moment
                behind the wheel feels like a dream come true
              </p>
              <div className="flex">
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </div>
            </div>
            <div className="md:w-1/3 p-5 shadow-lg rounded-2xl space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center h-12 w-12">
                  <User />
                </div>
                <label className="font-semibold">Jessica L</label>
              </div>
              <p>
                Owning an Audi isn&apos;t just about having a car; it&apos;s
                about being part of a community of like-minded individuals who
                appreciate quality, craftsmanship, and innovation.
              </p>
              <div className="flex">
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </div>
            </div>
          </div>
        </div>

        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Get a Quotes
                </h2>
                <p className="max-w-[600px] text-neutral-500 md:text-xl dark:text-neutral-400">
                  Stay updated with the latest product news and updates.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex sm:flex-row flex-col space-y-2 sm:space-y-0 sm:space-x-2">
                  <input
                    className="max-w-lg flex-1 px-4 py-2 border-border border rounded-md "
                    placeholder="Enter your email"
                    type="email"
                  />
                  <button
                    type="submit"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-neutral-900 px-4 text-sm font-medium text-neutral-50 shadow transition-colors hover:bg-neutral-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90 dark:focus-visible:ring-neutral-300"
                  >
                    Get a Quotes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          © 2024 the car site. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
