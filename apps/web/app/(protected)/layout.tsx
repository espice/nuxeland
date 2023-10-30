"use client";

import { useUser } from "@/utils/hooks/useUser";
import { redirect, usePathname } from "next/navigation";
import React from "react";
import Nav from "./Nav";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useUser();
  const pathname = usePathname();

  if (!user) {
    redirect("/");
  }

  return (
    <>
      {children}
      {pathname != "/pay/return" && <Nav />}
    </>
  );
}
