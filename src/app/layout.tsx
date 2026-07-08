import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HELOC Rate Table",
  description:
    "Compare today's best HELOC rates from top lenders. Personalize your search by ZIP code, property value, and loan amount.",
  openGraph: {
    title: "HELOC Rate Table",
    description: "Compare today's best HELOC rates from top lenders.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.variable}>
      <body>{children}</body>
    </html>
  );
}
