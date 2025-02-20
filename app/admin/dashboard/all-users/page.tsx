"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useToast } from "@/hooks/use-toast";
import { Id } from "@/convex/_generated/dataModel";

// Type for role
type Role = "read" | "write" | "admin";

const AllUsers = () => {
  const { toast } = useToast();
  const updateRole = useMutation(api.auth.updateRole);
  const [selectedRoles, setSelectedRoles] = useState<
    Record<string, Role | undefined>
  >({});
  const allUsers = useQuery(api.users.allUsers);

  const handleUpdateRole = async (userId: Id<"users">, role: Role) => {
    try {
      await updateRole({
        userId,
        role,
      });
      toast({
        title: "Success",
        description: "User role updated successfully",
      });
    } catch (error) {
      console.error("Role update error:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to update role",
        variant: "destructive",
      });
    }
  };

  if (!allUsers) {
    return <div className="mt-24 w-full text-center">Loading...</div>;
  }

  return (
    <div className="mt-24 w-full">
      <div className="w-full max-w-screen-xl mx-auto">
        <Table>
          <TableCaption>All the users of your blogging platform!</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Current Role</TableHead>
              <TableHead>Update Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allUsers.map((user) => (
              <TableRow key={user._id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const newRole = selectedRoles[user._id];
                      if (newRole) {
                        handleUpdateRole(user._id as Id<"users">, newRole);
                      }
                    }}
                    className="flex items-center gap-2"
                  >
                    <Select
                      onValueChange={(value: Role) =>
                        setSelectedRoles((prev) => ({
                          ...prev,
                          [user._id]: value,
                        }))
                      }
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="read">Read</SelectItem>
                        <SelectItem value="write">Write</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!selectedRoles[user._id]}
                    >
                      Update
                    </button>
                  </form>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AllUsers;
