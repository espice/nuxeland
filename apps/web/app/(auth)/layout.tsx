import React from "react";
import ForceMobile from "./ForceMobile";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ForceMobile>{children}</ForceMobile>;
}
