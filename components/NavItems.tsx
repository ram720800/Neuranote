"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Launch Neuranote", href: "/launch" },
  { label: "My Neuranotes", href: "/notes" },
  { label: "Dashboard", href: "/dashboard" },
];

const NavItems = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-8 max-sm:hidden font-semibold">
      {navItems.map(({ label, href }) => (
        <Link
          href={href}
          key={label}
          className={cn(
            "rounded px-3 py-1 transition-colors duration-200",
              pathname === href ? "text-primary bg-primary/10" : "text-muted-foreground"
            ,"hover:bg-primary/10 hover:text-primary"
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default NavItems;
