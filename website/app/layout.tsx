import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ADK Automotive | Driven by Passion",
  description: "Southeastern PA's leading automotive event provider. Experience world-class supercar shows, road rallies, and automotive events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

