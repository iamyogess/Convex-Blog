import type { Metadata } from "next";
import "./globals.css";
import MainLayout from "./../components/layout/MainLayout";

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
    <html lang="en">
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
