import Link from "next/link";

import { CarFrontIcon, LogInIcon } from "lucide-react";
import { defaultLinks } from "@/config/nav";
import { UserButton, auth } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Image from "next/image";

export default function Navbar() {
  const { userId } = auth();
  return (
    <header className="px-4 sticky bg-background/50 backdrop-blur-sm z-50 top-0 lg:px-6 h-16 flex items-center">
      <Link className="flex items-center space-x-2 justify-center" href="/">
        <Image
          src="/logo-white-.png"
          alt="The Car Site"
          width={100}
          height={100}
          className="rounded-full"
        />
      </Link>
      <nav className="ml-auto items-center flex gap-4 sm:gap-6">
        {defaultLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-md font-semibold flex items-center space-x-2 hover:underline underline-offset-4"
          >
            {link.icon && <link.icon className="w-5 h-5" />}
            <span className="hidden md:inline">{link.title}</span>
          </Link>
        ))}
        {userId ? (
          <UserButton afterSignOutUrl="/"/>
        ) : (
          <Button asChild className="px-4">
            <Link
              href="/sign-in"
              className="text-md font-medium hover:underline underline-offset-4"
            >
              <LogInIcon className="w-4 h-4 mr-2" />
              Login
            </Link>
          </Button>
        )}
      </nav>
    </header>
  );
}
