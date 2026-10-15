/** Hosted enrollment/checkout (Clerri). All "Get Started" / "Become a Member" CTAs lead here. */
export const MEMBERSHIP_ENROLLMENT_URL =
  "https://member.clerri.com/enrollment/accounts/create?slug=VN7R";

/** Public annual membership offer, used for ad-platform event values. Keep in sync with the pricing UI. */
export const ANNUAL_MEMBERSHIP = {
  id: "gleam-annual-membership",
  name: "Gleam Annual Membership",
  value: 297,
  currency: "USD",
} as const;
