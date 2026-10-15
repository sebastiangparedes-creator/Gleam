/**
 * Pure, dependency-free helpers for Meta Pixel and TikTok Pixel browser events.
 * Every call is guarded so blocked/missing vendor scripts can never throw.
 * Payloads contain only public offer metadata - never health or personal data.
 */

export const META_PIXEL_ID = "839864372254528";
export const TIKTOK_PIXEL_ID = "D629TGJC77U3JJI2GJ00";

export type MembershipOffer = {
  readonly id: string;
  readonly name: string;
  readonly value: number;
  readonly currency: string;
};

export type PixelWindow = {
  fbq?: (...args: unknown[]) => void;
  ttq?: {
    page?: () => void;
    track?: (event: string, params?: Record<string, unknown>) => void;
  };
};

export function buildMetaContentPayload(offer: MembershipOffer) {
  return {
    content_name: offer.name,
    content_ids: [offer.id],
    content_type: "product",
    value: offer.value,
    currency: offer.currency,
  };
}

export function buildTikTokContentPayload(offer: MembershipOffer) {
  return {
    content_id: offer.id,
    content_type: "product",
    content_name: offer.name,
    contents: [
      { content_id: offer.id, content_type: "product", content_name: offer.name },
    ],
    value: offer.value,
    currency: offer.currency,
  };
}

function safely(fn: () => void): void {
  try {
    fn();
  } catch {
    // Tracking must never break the page.
  }
}

export function trackPageView(w: PixelWindow | undefined): void {
  if (!w) return;
  safely(() => w.fbq?.("track", "PageView"));
  safely(() => w.ttq?.page?.());
}

export function trackViewContent(w: PixelWindow | undefined, offer: MembershipOffer): void {
  if (!w) return;
  safely(() => w.fbq?.("track", "ViewContent", buildMetaContentPayload(offer)));
  safely(() => w.ttq?.track?.("ViewContent", buildTikTokContentPayload(offer)));
}

export function trackInitiateCheckout(w: PixelWindow | undefined, offer: MembershipOffer): void {
  if (!w) return;
  safely(() => w.fbq?.("track", "InitiateCheckout", buildMetaContentPayload(offer)));
  safely(() => w.ttq?.track?.("InitiateCheckout", buildTikTokContentPayload(offer)));
}
