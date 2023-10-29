"use client";

import { useUser } from "@/utils/hooks/useUser";
import { redirect } from "next/navigation";
import React from "react";
import Nav from "./Nav";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useUser();

  if (!user) {
    redirect("/");
  }

  return (
    <>
      {children}
      <Nav />
    </>
  );
}
