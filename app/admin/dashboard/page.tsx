import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Dashboard = () => {
  return (
    <div className="mt-32 h-[80vh] max-w-screen-xl w-full mx-auto flex justify-center items-center">
      <div className="flex gap-x-4">
        <Link href="/admin/dashboard/all-posts">
          <Button>All Posts</Button>
        </Link>
        <Link href="/admin/dashboard/all-users">
          <Button>All Users</Button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
