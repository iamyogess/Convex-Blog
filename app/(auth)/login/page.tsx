"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { signInSchema } from "@/schemas/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Github } from "lucide-react";
import { Facebook } from "lucide-react";
import { Instagram } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";

const Login = () => {
  const { signIn } = useAuthActions();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof signInSchema>) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("flow", "signIn");

    try {
      await signIn("password", formData);
    } catch (error) {
      console.error("Sign up error:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 my-28 max-w-md lg:border rounded-lg">
      <div className="space-y-3 text-center">
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-muted-foreground">Enter your details to login</p>
      </div>

      <div className="mt-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Email</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter email" {...field} />
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
                      placeholder="Enter password"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="w-full h-11 mt-6" type="submit">
              Login
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
          <Button
            onClick={async () => {
              // setIsLoading(true);
              void signIn("github", {
                redirectTo: "/",
              });
            }}
          >
            <Github className="h-6 w-6" />
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
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium underline underline-offset-4 hover:text-primary"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
