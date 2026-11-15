import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Sans, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TopNavigation } from "@/components/TopNavigation";

const nunitoSansHeading = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
});

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Random Quotes",
  description:
    "Discover, like, and share inspiring quotes from a community of readers.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        dmSans.variable,
        nunitoSansHeading.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <TopNavigation />
        {children}
      </body>
    </html>
  );
}
