"use client";

import { useEffect } from "react";
import { CLERRI_LOCATIONS, CURRENCY, MEMBERSHIP_VALUE, track } from "@/lib/tracking";

/**
 * Fires the browser `purchase` event once per order.
 * The server-side copy (Meta CAPI / TikTok Events API) must reuse the same
 * event_id (`purchase_<order_id>`) so the platforms count it once.
 */
export function PurchaseTracker() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const orderId = (params.get("order_id") || "").slice(0, 100);
    const rawLocation = params.get("location") || "";
    const location_name = CLERRI_LOCATIONS[rawLocation.toUpperCase()] || rawLocation || "unknown";

    const key = `gleam_purchase_${orderId || "no_order_id"}`;
    try {
      if (window.localStorage.getItem(key)) return;
      window.localStorage.setItem(key, "1");
    } catch {
      // Storage blocked: still fire, worst case a refresh double counts.
    }

    track("purchase", {
      event_id: orderId ? `purchase_${orderId}` : undefined,
      transaction_id: orderId || undefined,
      value: MEMBERSHIP_VALUE,
      currency: CURRENCY,
      location_name,
      items: [{ item_id: "gleam_membership_annual", item_name: "Gleam Membership", price: MEMBERSHIP_VALUE, quantity: 1 }],
    });
  }, []);

  return null;
}
