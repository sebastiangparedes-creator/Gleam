import Link from "next/link";
import { PurchaseTracker } from "./PurchaseTracker";

export const metadata = {
  title: "Welcome to Gleam",
  description: "Your Gleam membership is active.",
  robots: { index: false, follow: false },
};

const CTA_YELLOW = "#fff86b";

/**
 * Post-checkout landing page. Clerri should redirect here after payment:
 * https://www.gleam-health.com/welcome?order_id={id}&location={slug or name}
 */
export default function WelcomePage() {
  return (
    <section className="px-6 py-20 sm:px-10 md:px-14 md:py-28">
      <PurchaseTracker />
      <div className="mx-auto max-w-2xl rounded-2xl bg-black px-8 py-12 sm:px-12 sm:py-16">
        <p className="mb-4 font-mono text-[11px] font-bold uppercase tracking-[2px] text-neutral-500">
          Membership confirmed
        </p>
        <h1
          className="font-alliance text-[clamp(2rem,6vw,3rem)] font-black uppercase leading-[1.05]"
          style={{ color: CTA_YELLOW }}
        >
          You&apos;re in.
        </h1>
        <p className="mt-5 text-[15px] leading-relaxed text-neutral-400">
          Your Gleam membership is active. Unlimited cleanings, exams and X-rays for the year.
          Check your email for your receipt and next steps to book your first visit.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="tel:+18007910200"
            className="rounded-full px-8 py-3.5 text-center text-[14px] font-bold text-black transition-opacity hover:opacity-90"
            style={{ backgroundColor: CTA_YELLOW }}
          >
            Call to book (800) 791-0200
          </Link>
          <Link
            href="/"
            className="rounded-full border border-neutral-700 px-8 py-3.5 text-center text-[14px] font-bold text-white transition-colors hover:border-white"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
