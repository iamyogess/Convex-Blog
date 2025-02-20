"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { LayoutDashboard, LogOut, SquarePen, User } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useAuthActions } from "@convex-dev/auth/react";
import {
  Authenticated,
  Unauthenticated,
  useMutation,
  useQuery,
} from "convex/react";
import { api } from "@/convex/_generated/api";

const Navbar = () => {
  const { signOut } = useAuthActions();
  const user = useQuery(api.users.currentUser);
  const updateRole = useMutation(api.auth.updateRole);
  const [selectedRole, setSelectedRole] = useState<string | undefined>(
    undefined
  );

  const handleUpdateRole = async (data: any) => {
    try {
      await updateRole({
        role: data.role,
      });
    } catch (error) {
      console.log("Role update error!");
    }
  };

  return (
    <nav className="fixed top-0 w-full h-20 bg-background/80 backdrop-blur-md border-b px-3 lg:px-0">
      <div className="w-full h-full max-w-screen-xl mx-auto  flex justify-between items-center">
        <div>
          <Link href="/" className="text-3xl font-bold">
            LOGO
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Desktop Navigation */}
          {/* select role  */}
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault(); // Prevent default form submission
                handleUpdateRole({ role: selectedRole }); // Pass the selected role
              }}
            >
              <Select onValueChange={(value) => setSelectedRole(value)}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="write">Write</SelectItem>
                </SelectContent>
              </Select>
              <button
                type="submit"
                className="ml-2 bg-blue-500 text-white px-4 py-1 rounded"
              >
                Update
              </button>
            </form>
          </div>
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
              <Authenticated>
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
                        {user?.name ?? user?.email}
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
              </Authenticated>

              {/* unauthenticated  */}
              <Unauthenticated>
                <div className="flex gap-x-4">
                  <Link href="/register">
                    <Button>Register</Button>
                  </Link>
                  <Link href="/login">
                    <Button>Login</Button>
                  </Link>
                </div>
              </Unauthenticated>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
