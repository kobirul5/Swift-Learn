import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "@/redux/SroteProvider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Swift Learn",
  description: "Learning management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <StoreProvider>
        <body
          className={`antialiased bg-primary-100/10`}

        >
          <Toaster />

          {children}
        </body>
      </StoreProvider>
    </html>
  );
}
