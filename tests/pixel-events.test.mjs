import assert from "node:assert/strict";
import { test } from "node:test";
import {
  buildMetaContentPayload,
  buildTikTokContentPayload,
  trackInitiateCheckout,
  trackPageView,
  trackViewContent,
} from "../src/lib/analytics/events.ts";

const offer = { id: "plan", name: "Plan", value: 297, currency: "USD" };

function makeWindow() {
  const calls = [];
  return {
    calls,
    fbq: (...args) => calls.push(["fbq", ...args]),
    ttq: {
      page: () => calls.push(["ttq.page"]),
      track: (...args) => calls.push(["ttq.track", ...args]),
    },
  };
}

test("PageView fires on both pixels", () => {
  const w = makeWindow();
  trackPageView(w);
  assert.deepEqual(w.calls, [["fbq", "track", "PageView"], ["ttq.page"]]);
});

test("ViewContent and InitiateCheckout carry value and currency", () => {
  const w = makeWindow();
  trackViewContent(w, offer);
  trackInitiateCheckout(w, offer);
  assert.deepEqual(w.calls, [
    ["fbq", "track", "ViewContent", buildMetaContentPayload(offer)],
    ["ttq.track", "ViewContent", buildTikTokContentPayload(offer)],
    ["fbq", "track", "InitiateCheckout", buildMetaContentPayload(offer)],
    ["ttq.track", "InitiateCheckout", buildTikTokContentPayload(offer)],
  ]);
  assert.equal(buildMetaContentPayload(offer).value, 297);
  assert.equal(buildTikTokContentPayload(offer).currency, "USD");
});

test("missing or throwing pixels never throw", () => {
  assert.doesNotThrow(() => trackPageView(undefined));
  assert.doesNotThrow(() => trackViewContent({}, offer));
  const throwing = {
    fbq: () => {
      throw new Error("blocked");
    },
    ttq: {
      track: () => {
        throw new Error("blocked");
      },
    },
  };
  assert.doesNotThrow(() => trackInitiateCheckout(throwing, offer));
});

test("a throwing Meta pixel does not stop TikTok", () => {
  const calls = [];
  const w = {
    fbq: () => {
      throw new Error("blocked");
    },
    ttq: { track: (...args) => calls.push(args) },
  };
  trackInitiateCheckout(w, offer);
  assert.equal(calls.length, 1);
});
