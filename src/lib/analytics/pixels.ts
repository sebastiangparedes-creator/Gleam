"use client";

import { ANNUAL_MEMBERSHIP } from "@/lib/membership";
import {
  trackInitiateCheckout as sendInitiateCheckout,
  trackPageView as sendPageView,
  trackViewContent as sendViewContent,
  type PixelWindow,
} from "./events";

function getWindow(): PixelWindow | undefined {
  return typeof window === "undefined" ? undefined : (window as unknown as PixelWindow);
}

let lastPageViewPath: string | null = null;

/** Fires PageView once per distinct path (guards against React Strict Mode double effects). */
export function trackPageView(path: string): void {
  if (path === lastPageViewPath) return;
  lastPageViewPath = path;
  sendPageView(getWindow());
}

export function trackViewContent(): void {
  sendViewContent(getWindow(), ANNUAL_MEMBERSHIP);
}

export function trackInitiateCheckout(): void {
  sendInitiateCheckout(getWindow(), ANNUAL_MEMBERSHIP);
}
