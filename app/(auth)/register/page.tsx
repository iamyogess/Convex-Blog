"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Github, Facebook, Instagram } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";

// Define the schema for the sign up form
const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
});

const Register = () => {
  const { signIn } = useAuthActions();
  
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof signUpSchema>) => {
    const formData = new FormData();
    formData.append("name", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("flow", "signUp");
    
    try {
      await signIn("password", formData);
    } catch (error) {
      console.error("Sign up error:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-28 max-w-md lg:border rounded-lg">
      <div className="space-y-3 text-center">
        <h1 className="text-2xl font-bold">Create Account</h1>
        <p className="text-muted-foreground">
          Enter your details to create your account
        </p>
      </div>

      <div className="mt-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter username"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Create password"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="w-full h-11 mt-6" type="submit">
              Create Account
            </Button>
          </form>
        </Form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              or continue with
            </span>
          </div>
        </div>

        <div className="flex justify-center items-center gap-x-3">
          <Button>
            <div>
              <Github className="h-6 w-6" />
            </div>
          </Button>
          <Button>
            <div>
              <Facebook className="h-6 w-6" />
            </div>
          </Button>
          <Button>
            <div>
              <Instagram className="h-6 w-6" />
            </div>
          </Button>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium underline underline-offset-4 hover:text-primary"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;