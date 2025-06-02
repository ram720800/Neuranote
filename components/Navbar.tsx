"use client";

import Link from "next/link";
import Image from "next/image";
import NavItems from "./NavItems";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [onScroll, setOnScroll] = useState(false);
  const pathname = usePathname();
  const isLandingPage = pathname === "/" || pathname.startsWith("/sign-in");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 32) {
        setOnScroll(true);
      } else {
        setOnScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="navbar">
      <div
        className={cn(
          "flex items-center justify-between w-full",
          onScroll
            ? "px-6 py-2 bg-white rounded-2xl border transition-all duration-100 "
            : "px-6 py-2"
        )}
      >
        <Link href="/">
          <div className="flex items-center gap-2.5 cursor-pointer">
            <div className="font-extrabold text-2xl">Neuranote</div>
          </div>
        </Link>

        {!isLandingPage && (
          <div className="hidden lg:flex transition-all duration-500">
            <NavItems />
          </div>
        )}

        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton>
              <Button className="btn-signin">Sign in</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>

          {!isLandingPage && (
            <button onClick={toggleMobileMenu} className="lg:hidden">
              {isMobileMenuOpen ? (
                <Image
                  src="/icons/cancel.svg"
                  alt="clear"
                  width={24}
                  height={24}
                />
              ) : (
                <Image
                  src="/icons/menu.svg"
                  alt="menu"
                  width={24}
                  height={24}
                />
              )}
            </button>
          )}
        </div>

        {!isLandingPage && isMobileMenuOpen && (
          <div className="lg:hidden absolute top-15 left-0 right-0 bg-white shadow-lg z-50">
            <div className="py-4">
              <NavItems isMobile={true} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
