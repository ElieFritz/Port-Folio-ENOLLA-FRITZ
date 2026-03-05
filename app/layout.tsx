import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display"
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "Growth Strategist Portfolio",
  description:
    "A premium storytelling portfolio for a Growth Strategist & Marketing Communication Specialist."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${displayFont.variable} ${bodyFont.variable} min-h-screen bg-canvas font-body text-ink antialiased`}
      >
        <div className="fixed inset-0 -z-10 bg-hero-radial" />
        <div className="fixed inset-0 -z-10 opacity-60 [background-image:linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] [background-size:72px_72px]" />
        {children}
      </body>
    </html>
  );
}
