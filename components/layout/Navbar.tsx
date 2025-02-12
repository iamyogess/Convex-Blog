"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  SquarePen,
  User,
  X,
} from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const Navbar = () => {
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setIsOpenMobileMenu((prev) => !prev);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 w-full h-20 bg-background/80 backdrop-blur-md border-b">
      <div className="w-full h-full max-w-screen-xl mx-auto  flex justify-between items-center">
        <div>
          <Link href="/" className="text-3xl font-bold">
            LOGO
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <Link href="/new-story">
              <Button
                variant="outline"
                className="hidden bg-transparent sm:flex items-center gap-2 shadow-md"
              >
                <SquarePen className="h-4 w-4" /> Write
              </Button>
            </Link>
            <ThemeToggle />
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    {" "}
                    <div className="flex gap-x-2 items-center">
                      <User className="h-4 w-4" />
                      Profile
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {" "}
                    <div className="flex gap-x-2 items-center">
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </div>
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem>Author Verification</DropdownMenuItem> */}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <div className="flex gap-x-2 items-center">
                      <LogOut className="h-4 w-4" />
                      Logout
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isOpenMobileMenu ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpenMobileMenu && (
        <div className="lg:hidden fixed inset-x-0 top-24 bg-background border-t animate-in slide-in-from-top">
          <div className="max-w-screen-xl mx-auto px-4 py-6">
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-2 hover:text-primary transition-colors"
                    onClick={() => setIsOpenMobileMenu(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-4">
                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2 justify-center bg-transparent"
                >
                  <SquarePen className="h-4 w-4" /> Write
                </Button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
