"use client";

import React, { useState, useEffect } from "react";

export default function ForceMobile({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState<null | boolean>(null);

  useEffect(() => {
    if (window) {
      if (window.innerWidth > 450) {
        setIsMobile(false);
      } else {
        setIsMobile(true);
      }
    }
  }, []);

  if (isMobile === null) return <>loading...</>;
  if (!isMobile) return <>Please open this website on a Mobile Device</>;

  return <>{children}</>;
}
