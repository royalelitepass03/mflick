import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "mFlick — Private Social",
  description: "A premium, private social experience.",
  metadataBase: new URL("https://mflick.vercel.app"),
  openGraph: {
    title: "mFlick",
    description: "Private social — beautiful, fast, yours.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="bg-bg-main text-text-main font-sans min-h-full selection:bg-amber-500/20">
        <div className="flex min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
