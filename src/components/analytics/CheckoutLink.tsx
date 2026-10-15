"use client";

import { useEffect, useRef, type MouseEvent, type ReactNode } from "react";
import { trackInitiateCheckout } from "@/lib/analytics/pixels";
import { MEMBERSHIP_ENROLLMENT_URL } from "@/lib/membership";

/** Max wait so the pixel requests can be dispatched before leaving the page. */
const NAVIGATION_DELAY_MS = 150;

type CheckoutLinkProps = {
  className?: string;
  children: ReactNode;
  /** Extra side effect on click (e.g. closing a menu). */
  onClick?: () => void;
};

/**
 * Link to the hosted Clerri enrollment flow that fires InitiateCheckout (Meta + TikTok) first.
 * Remains a real anchor (right-click, middle-click, keyboard and crawlers all work); tracking
 * can never block navigation.
 */
export function CheckoutLink({ className, children, onClick }: CheckoutLinkProps) {
  const navigatingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.();

    // Let the browser handle new-tab / download style clicks natively; just track them.
    const isModified =
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0;

    if (isModified) {
      trackInitiateCheckout();
      return;
    }

    event.preventDefault();
    if (navigatingRef.current) return;
    navigatingRef.current = true;

    trackInitiateCheckout();
    timerRef.current = setTimeout(() => {
      navigatingRef.current = false;
      window.location.assign(MEMBERSHIP_ENROLLMENT_URL);
    }, NAVIGATION_DELAY_MS);
  };

  return (
    <a href={MEMBERSHIP_ENROLLMENT_URL} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
