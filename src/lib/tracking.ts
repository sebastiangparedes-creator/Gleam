/**
 * Gleam ad tracking helpers.
 *
 * The site never talks to Meta, TikTok or GA4 directly. It only pushes
 * events into window.dataLayer, and the GTM container (GTM-MX4WX6S9)
 * forwards them to each platform. See the "Gleam Ad Tracking Checklist" doc
 * for the event spec.
 *
 * Privacy: never pass names, emails, phone numbers, insurance status,
 * conditions or treatment info into track(). Keep params generic.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export const MEMBERSHIP_VALUE = 297;
export const CURRENCY = "USD";

/** Clerri enrollment slug -> Gleam location name. */
export const CLERRI_LOCATIONS: Record<string, string> = {
  VN7R: "West Hollywood",
  QN5D: "Calabasas",
  TE3V: "Encino",
  QX3X: "Valencia",
  DU9M: "Northridge",
  PX5G: "La Puente",
  CV6K: "Corona",
};

const ATTR_COOKIE = "gleam_attr";
const VISITOR_COOKIE = "gleam_vid";
const COOKIE_DAYS = 90;

const ATTR_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "ttclid",
] as const;

type AttrKey = (typeof ATTR_KEYS)[number];
type Touch = Partial<Record<AttrKey, string>> & { landing_page?: string; ts?: number };
type Attribution = { first?: Touch; last?: Touch };

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function writeCookie(name: string, value: string, days = COOKIE_DAYS) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

/** Stable anonymous visitor id, used to match a Clerri purchase back to the visit. */
export function getVisitorId(): string {
  let id = readCookie(VISITOR_COOKIE);
  if (!id) {
    id = newId();
    writeCookie(VISITOR_COOKIE, id, 365);
  }
  return id;
}

export function getAttribution(): Attribution {
  try {
    return JSON.parse(readCookie(ATTR_COOKIE) || "{}") as Attribution;
  } catch {
    return {};
  }
}

/**
 * Save UTMs and ad click ids from the landing URL.
 * First touch is kept forever (90 days), last touch is replaced on every
 * new ad visit.
 */
export function captureAttribution() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const touch: Touch = {};
  for (const key of ATTR_KEYS) {
    const value = params.get(key);
    if (value) touch[key] = value.slice(0, 200);
  }
  getVisitorId();
  if (Object.keys(touch).length === 0) return;

  touch.landing_page = window.location.pathname;
  touch.ts = Date.now();
  const current = getAttribution();
  writeCookie(ATTR_COOKIE, JSON.stringify({ first: current.first ?? touch, last: touch }));
}

/** Push one event into the dataLayer. Returns the event_id for dedup with server events. */
export function track(event: string, params: Record<string, unknown> = {}): string {
  const event_id = (params.event_id as string) || newId();
  if (typeof window === "undefined") return event_id;
  window.dataLayer = window.dataLayer || [];
  const last = getAttribution().last ?? {};
  window.dataLayer.push({
    event,
    utm_source: last.utm_source,
    utm_medium: last.utm_medium,
    utm_campaign: last.utm_campaign,
    utm_content: last.utm_content,
    ...params,
    event_id,
  });
  return event_id;
}

/** Add stored UTMs, click ids and the visitor id to an outbound Clerri link. */
export function withAttribution(href: string): string {
  try {
    const url = new URL(href);
    const last = getAttribution().last ?? {};
    for (const key of ATTR_KEYS) {
      const value = last[key];
      if (value && !url.searchParams.has(key)) url.searchParams.set(key, value);
    }
    url.searchParams.set("gleam_ref", getVisitorId());
    return url.toString();
  } catch {
    return href;
  }
}

/** Location name for a Clerri enrollment URL, or "unknown". */
export function locationFromClerriUrl(href: string): string {
  try {
    const slug = new URL(href).searchParams.get("slug") ?? "";
    return CLERRI_LOCATIONS[slug.toUpperCase()] ?? "unknown";
  } catch {
    return "unknown";
  }
}
