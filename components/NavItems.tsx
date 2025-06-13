"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion } from "framer-motion";

const navItems = [
  { id: "launch", label: "Launch Neuranote", href: "/launch" },
  { id: "notes", label: "My Neuranotes", href: "/notes" },
  { id: "dashboard", label: "Dashboard", href: "/dashboard" },
];

interface NavItemsProps {
  isMobile?: boolean;
}

const NavItems = ({ isMobile = false }: NavItemsProps) => {
  const [activeNav, setActiveNav] = useState(navItems[0].id);

  return (
    <nav
      className={cn(
        "font-semibold",
        isMobile ? "flex flex-col gap-2 px-6" : "flex gap-8 "
      )}
    >
      {navItems.map((nav) => (
        <Link
          href={nav.href}
          key={nav.id}
          onClick={() => setActiveNav(nav.id)}
          className={cn(
            "relative rounded-4xl px-3 py-1 text-primary",
            activeNav === nav.id ? "" : "hover:text-muted-foreground",
            isMobile && "tex-left w-full h-full"
          )}
        >
          {activeNav === nav.id && (
            <motion.div
              layoutId="active-nav"
              className="absolute inset-0 bg-neutral-300/20 hover:bg-neutral-300/30 backdrop-blur-[1px] border border-neutral-400/20"
              style={{borderRadius:32}}
            />
          )}
          <span className="relative z-10">{nav.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default NavItems;
