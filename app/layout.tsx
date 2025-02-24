import type { Metadata } from "next";
import "./globals.css";
import MainLayout from "./../components/layout/MainLayout";
import { ConvexClientProvider } from "@/context/ConvexClientProvider";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Blog",
  description: "Next Generation Blogging Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en">
        <body>
          <ConvexClientProvider>
            <MainLayout>{children}</MainLayout>
          </ConvexClientProvider>
          <Toaster />
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
