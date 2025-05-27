import Link from "next/link";
import NavItems from "./NavItems";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link href="/">
        <div className="flex items-center gap-2.5 cursor-pointer">
          <div className="font-extrabold text-2xl">Neuranote</div>
        </div>
      </Link>
      <NavItems />
      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton><button className="btn-signin">Sign in</button></SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
