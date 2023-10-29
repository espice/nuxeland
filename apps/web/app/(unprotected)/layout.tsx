"use client";

import { useUser } from "@/utils/hooks/useUser";
import { redirect } from "next/navigation";
import React from "react";

export default function UnProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useUser();

  console.log(user);
  if (user) {
    redirect("/home");
  }

  return children;
}
