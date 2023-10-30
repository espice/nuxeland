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
      console.log(window.innerWidth);
      if (window.innerWidth > 450) {
        setIsMobile(false);
      } else {
        setIsMobile(true);
      }
    }
  }, []);

  if (isMobile === null) return <>{children}</>;
  if (!isMobile) return <div>Please open this website on a Mobile Device</div>;

  return <>{children}</>;
}
