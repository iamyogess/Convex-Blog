import Link from "next/link";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Footer = () => {
  return (
    <footer className="w-full py-12 mt-10">
      <div className="w-full max-w-screen-xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Info Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">About</h2>
          <p className="text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            cupiditate ab optio voluptatem ipsam quibusdam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, sit.
          </p>
          <div className="space-y-2">
            <p className="flex items-center gap-2">
              <span className="font-medium">Email:</span>
              <span className="text-muted-foreground">Yogesh Shrestha</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="font-medium">Mobile:</span>
              <span className="text-muted-foreground">986676543</span>
            </p>
          </div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Quick Links</h2>
            <ul className="space-y-2">
              {['Entertainment', 'Sports', 'Technology', 'Business', 'Lifestyle'].map((item, index) => (
                <li key={index}>
                  <Link 
                    href="#" 
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Categories</h2>
            <ul className="space-y-2">
              {['World News', 'Politics', 'Health', 'Science', 'Culture'].map((item, index) => (
                <li key={index}>
                  <Link 
                    href="#" 
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Weekly Newsletter</h2>
          <p className="text-muted-foreground">
            Get the latest news and updates delivered straight to your inbox.
          </p>
          <form className="space-y-4">
            <Input 
              type="email" 
              placeholder="Enter your email"
              className="bg-background"
            />
            <Button className="w-full">
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="w-full max-w-screen-xl mx-auto px-4 mt-12 pt-6 border-t">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;