import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {Toaster} from "@/components/ui/sonner";
import Header from "@/components/header";
import {getUserData} from "@/lib/server-utils";
import React from "react";

const inter = Inter({
        variable: "--font-inter",
        subsets: ['latin']
    }
)

export const metadata: Metadata = {
    title: "Shooorty - The URL Shortener",
    description: "The URL Shortener",
};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await getUserData();

    return (
        <html lang="en">
        <body
            className={`${inter.variable} antialiased`}
        >
        <div
            className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] overflow-auto"></div>
        <Header user={user}/>
        {children}
        <Toaster position="bottom-right"/>
        </body>
        </html>
    );
}
