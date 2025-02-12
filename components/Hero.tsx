import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="w-full my-32 md:mt-40">
      <div className="w-full max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        {/* Content Section */}
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Welcome to Our
            <span className="text-primary"> Platform</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover amazing content and connect with our community. Start your
            journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg">
              <Link href="/register">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline">
              <Link href="/explore">Explore Now</Link>
            </Button>
          </div>
        </div>

        {/* Image Section */}
        <Image
          src="https://images.pexels.com/photos/14704124/pexels-photo-14704124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Hero Image"
          height={600}
          width={600}
          className="rounded-lg object-cover"
          priority
        />
      </div>
    </div>
  );
};

export default Hero;
