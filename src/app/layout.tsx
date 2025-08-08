import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono, Open_Sans, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/global/Header";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { ModalRenderer } from "@/components/modals/ModalRenderer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quaiz",
  description: "Advanced AI quiz maker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html dir="ltr" lang="en">
        <body className={inter.variable}>
          <ReactQueryProvider>
            <ModalRenderer />
            {children}
          </ReactQueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
