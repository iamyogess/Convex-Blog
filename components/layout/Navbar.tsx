"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Menu, Plus, X } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";

const Navbar = () => {
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  
  const toggleMobileMenu = () => {
    setIsOpenMobileMenu((prev) => !prev);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" }
  ];

  return (
    <nav className="fixed top-0 w-full h-20 bg-background/80 backdrop-blur-sm border-b">
      <div className="w-full h-full max-w-screen-xl mx-auto px-4 flex justify-between items-center">
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
            <Button variant="outline" className="hidden sm:flex items-center gap-2">
              <Plus className="h-4 w-4" /> Create
            </Button>
            <ThemeToggle />
            
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
                <Button variant="outline" className="w-full flex items-center gap-2 justify-center">
                  <Plus className="h-4 w-4" /> Create
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