import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { Clock, User } from "lucide-react";
import Link from "next/link";

const BlogCard = () => {
  return (
    <Card>
      <Image
        src="https://images.pexels.com/photos/30496650/pexels-photo-30496650/free-photo-of-solitary-house-on-rugged-mountain-landscape.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        height={500}
        width={500}
        alt="blog image"
        className="rounded-t-lg"
      />

      <CardHeader>
        <CardTitle className="text-lg">Card Title</CardTitle>
        <div className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Yogesh Shrestha</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>2 mins read</span>
          </div>
        </div>
        <CardDescription>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet
          accusantium saepe, aliquid aspernatur nesciunt blanditiis.
        </CardDescription>
      </CardHeader>

      <CardFooter>
        <Button className="w-full">
            <Link href={`/single/id`}>Read More</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
