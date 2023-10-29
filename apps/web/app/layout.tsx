import "./styles/globals.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ForceMobile from "./(auth)/ForceMobile";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "nuxEland",
  description: "Welcome to the fun filled lands!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ForceMobile>
        <body className={inter.className}>{children}</body>
      </ForceMobile>
    </html>
  );
}
