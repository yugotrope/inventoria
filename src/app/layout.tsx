import type { Metadata } from "next";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "../stack";
import { Geist, Geist_Mono, Reddit_Sans } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/ui/navbar-04/navbar-04";
import { ThemeProvider } from "./_components/theme-provider";
import { Toaster } from 'react-hot-toast';
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";

const redditSans = Reddit_Sans({
  variable: "--font-reddit-sans",
  subsets: ["latin"],
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inventoria",
  description: "Inventory management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${redditSans.variable} antialiased`}
      ><StackProvider app={stackServerApp}><StackTheme>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
        <NextSSRPlugin
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        <NavBar/>
        {children}
        </ThemeProvider>
      </StackTheme></StackProvider></body>
    </html>
  );
}
