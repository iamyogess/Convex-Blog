"use client";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import {
  LayoutDashboard,
  LogOut,
  SquarePen,
  User,
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
import { useAuthActions } from "@convex-dev/auth/react";

const Navbar = () => {
  const { signOut } = useAuthActions();
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
                    <div
                      onClick={() => {
                        if (window.confirm("Do you really want to logout?")) {
                          void signOut();
                        }
                      }}
                      className="flex gap-x-2 items-center"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
