import "@/styles/globals.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ForceMobile from "./ForceMobile";
import { gqlClient } from "@/utils/gql";
import { AuthProvider } from "@/utils/context/AuthCtx";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "nuxEland",
  description: "Welcome to the fun filled lands!",
  manifest: "/manifest.json",
  themeColor: "#D486B8",
};

async function getUser() {
  try {
    const { me } = await gqlClient().query({
      me: {
        id: true,
        name: true,
        email: true,
        avatar: true,
      },
    });
    return me;
  } catch (e) {
    return null;
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <ForceMobile>
          <AuthProvider user={user}>{children}</AuthProvider>
          <div id={"popupContainer"} />
        </ForceMobile>
      </body>
    </html>
  );
}
