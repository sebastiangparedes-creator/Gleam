"use client";

import { useEffect } from "react";
import { trackViewContent } from "@/lib/analytics/pixels";

type PricingViewTrackerProps = {
  /** DOM id of the pricing section to watch. */
  targetId: string;
};

/** Fires ViewContent once per mount, when the pricing section is meaningfully visible. */
export function PricingViewTracker({ targetId }: PricingViewTrackerProps) {
  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    if (typeof IntersectionObserver === "undefined") {
      trackViewContent();
      return;
    }

    let fired = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (fired || !entries.some((entry) => entry.isIntersecting)) return;
        fired = true;
        observer.disconnect();
        trackViewContent();
      },
      { threshold: 0.1 },
    );
    observer.observe(target);

    return () => observer.disconnect();
  }, [targetId]);

  return null;
}
