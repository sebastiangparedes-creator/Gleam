"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  CURRENCY,
  MEMBERSHIP_VALUE,
  captureAttribution,
  locationFromClerriUrl,
  track,
  withAttribution,
} from "@/lib/tracking";

const CLERRI_HOST = "member.clerri.com";

/** Where on the page a click happened: header, footer, or the nearest section id. */
function positionOf(el: Element): string {
  if (el.closest("header")) return "header";
  if (el.closest("footer")) return "footer";
  const section = el.closest("section[id], [id]");
  return section?.id || "page";
}

function textOf(el: HTMLElement): string {
  return (el.innerText || el.textContent || "").replace(/\s+/g, " ").trim().slice(0, 60);
}

/**
 * Site-wide tracking. Mounted once in the root layout.
 * Pushes funnel events into the dataLayer for GTM to forward.
 */
export function Analytics() {
  const pathname = usePathname();

  // Attribution + page level events on every route change.
  useEffect(() => {
    captureAttribution();
    track("page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
    if (pathname === "/services") track("view_services", { content_name: "services" });
    if (pathname === "/locations") track("view_locations", { page_path: pathname });
  }, [pathname]);

  // Pricing section reaches the middle of the screen, once per page view.
  // (A ratio threshold fails here because the section is taller than most phones.)
  useEffect(() => {
    const el = document.getElementById("become-a-member");
    if (!el || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          track("view_pricing", {
            content_name: "membership",
            value: MEMBERSHIP_VALUE,
            currency: CURRENCY,
          });
          observer.disconnect();
        }
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [pathname]);

  // Scroll depth 50% and 90% on home and services.
  useEffect(() => {
    if (pathname !== "/" && pathname !== "/services") return;
    const fired = new Set<number>();
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = (window.scrollY / max) * 100;
      for (const mark of [50, 90]) {
        if (pct >= mark && !fired.has(mark)) {
          fired.add(mark);
          track("scroll_depth", { percent: mark, page_path: pathname });
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // One click listener for CTAs, Clerri signup links and contact links.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") || "";

      // Outbound to Clerri: the location pick and the checkout start are the same click.
      if (a.hostname === CLERRI_HOST) {
        const location_name = locationFromClerriUrl(a.href);
        const position = positionOf(a);
        track("select_location", { location_name, cta_position: position });
        track("begin_checkout", {
          location_name,
          cta_position: position,
          value: MEMBERSHIP_VALUE,
          currency: CURRENCY,
        });
        // Carry UTMs, click ids and the visitor id into checkout.
        a.href = withAttribution(a.href);
        return;
      }

      if (href.startsWith("tel:")) {
        track("contact", { contact_type: "phone", cta_position: positionOf(a) });
        return;
      }
      if (href.startsWith("mailto:")) {
        track("contact", { contact_type: "email", cta_position: positionOf(a) });
        return;
      }

      // Membership CTAs that move people toward the locations page or pricing.
      if (href === "/locations" || href === "/#become-a-member") {
        track("cta_click", { cta_text: textOf(a), cta_position: positionOf(a), cta_target: href });
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
