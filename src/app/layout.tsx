import type { Metadata } from "next";
import { Google_Sans_Flex } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { TopHeader } from "./components/ui/TopHeader";
import Copyright from "./components/ui/Copyright";
import { MetaPixel } from "./components/analytics/MetaPixel";

const googleSansFlex = Google_Sans_Flex({
  variable: "--font-google-sans-flex",
  subsets: ["latin"],
  axes: ["opsz"],
});

const awesomeSerif = localFont({
  variable: "--font-awesome-serif",
  display: "swap",
  src: [
    { path: "./fonts/AwesomeSerif-Var.ttf", style: "normal" },
    { path: "./fonts/AwesomeSerif-Italic-Var.ttf", style: "italic" },
  ],
});

export const metadata: Metadata = {
  title: "PeptiPharmaRX",
  description: "PeptiPharmaRX",
  icons: {
    icon: "/fav-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${googleSansFlex.variable} ${awesomeSerif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <MetaPixel />
        <TopHeader />

        <main className="mt-10 lg:mt-20 max-w-lvw overflow-x-clip lg:max-w-400 w-full mx-auto">
          <>{children}</>
          <Copyright />
        </main>
      </body>
    </html>
  );
}
