"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { trackPageView } from "@/lib/analytics/pixels";

/** Fires PageView on first load and on every client-side route change. Renders nothing. */
export function PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname) trackPageView(pathname);
  }, [pathname]);

  return null;
}
