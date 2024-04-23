import { SidebarLink } from "@/components/SidebarItems";
import { ShoppingCart, Globe, Car, Cog } from "lucide-react";

type AdditionalLinks = {
  title: string;
  links: SidebarLink[];
};

export const defaultLinks: SidebarLink[] = [
  { href: "/products", title: "Products", icon: Car },
  { href: '/cart', title: 'Cart', icon: ShoppingCart },
  { href: '/orders', title: 'Orders', icon: Globe },
  { href: '/settings', title: 'Settings', icon: Cog },
];

export const additionalLinks: AdditionalLinks[] = [];
