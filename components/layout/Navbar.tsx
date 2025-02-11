"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Menu, Plus, X } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";

const Navbar = () => {
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState<boolean>(false);
  const toggleMobileMenu = () => {
    setIsOpenMobileMenu((prev) => !prev);
  };

  return (
    <nav className="w-full h-24 flex  items-center">
      <div className="w-full max-w-screen-xl mx-auto flex justify-between items-center">
        <div>
          <a href="/" className="text-3xl font-bold capitalize">
            LOGO
          </a>
        </div>
        <div className="flex gap-x-4 justify-center items-center">
          <ul className="flex gap-x-4">
            <li>
              <Link href="#">Home</Link>
            </li>
            <li>
              <Link href="#">Home</Link>
            </li>
            <li>
              <Link href="#">Home</Link>
            </li>
          </ul>
          <div className="flex gap-x-4">
            <Button>
              <Plus /> Create
            </Button>
            <Button>Sign Up</Button>
            <Button>Sign In</Button>
          </div>
          <ThemeToggle />
          <div>
            <div className="block lg:hidden" onClick={toggleMobileMenu}>
              {isOpenMobileMenu ? <Menu /> : <X />}
            </div>

            {/* <ul className="flex flex-col gap-x-4">
            <li>
              <Link href="#">Home</Link>
            </li>
            <li>
              <Link href="#">Home</Link>
            </li>
            <li>
              <Link href="#">Home</Link>
            </li>
          </ul> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
