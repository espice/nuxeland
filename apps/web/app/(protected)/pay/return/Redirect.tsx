"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Redirect() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/pay");
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return <div></div>;
}
