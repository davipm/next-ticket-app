import "../index.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "@/providers/providers";
import { Nav } from "@/components/nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "next-ticket-app-1",
  description: "next-ticket-app-1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="flex h-screen max-h-screen flex-col">
            <Nav />
            <div className="grow overflow-y-auto bg-page p-5 text-default-test">
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
