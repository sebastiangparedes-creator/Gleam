import { CheckoutLink } from "@/components/analytics/CheckoutLink";
import { HeroScrollRotateImage } from "@/components/HeroScrollRotateImage";

/** Keep in sync with `homeHeaderBackground` in `Header.tsx` if you change this gradient. */
const heroSectionBackground =
  "linear-gradient(118.99deg, rgba(250, 243, 107, 0.8) 12.59%, rgba(252, 247, 159, 0.51829) 19.8%, rgba(255, 255, 255, 0) 42.13%)";

export function Hero() {
  return (
    <section
      id="hero-desktop"
      className="relative overflow-hidden pt-0 pb-0 sm:pt-6 sm:pb-0 md:pt-0 lg:pt-0 2xl:pt-0 xl:pt-0"
      style={{ background: heroSectionBackground }}
    >
      <div className="relative mx-auto max-w-7xl px-3 sm:px-6">
        {/* 2 columns at ALL breakpoints — text-left, image-right (matches desktop layout) */}
        <div className="relative z-10 grid grid-cols-2 items-center gap-2 sm:gap-4 md:gap-6 lg:items-stretch lg:gap-10 xl:gap-12 font-helvetica-neue-regular">

          {/* ── Left: text content ── */}
          <div className="relative z-10 flex min-h-0 w-full flex-col self-center lg:self-stretch lg:max-w-none justify-center">
            <div className="shrink-0">
              <p className="motion-safe:animate-slide-in-ltr motion-safe:[animation-delay:160ms] mt-1 text-[0.65rem] font-bold text-black tracking-[0.03em] sm:mt-3 sm:text-[0.8125rem] sm:tracking-[0.045em] md:mt-5 md:text-base md:tracking-[0.06em] lg:text-lg">
                One Annual Membership
              </p>
              <h1 className="motion-safe:animate-slide-in-ltr motion-safe:[animation-delay:160ms] mt-1 text-[1rem] font-semibold leading-[1.1] tracking-[0.02em] text-black sm:mt-2 sm:text-[1.4rem] sm:tracking-[0.04em] md:mt-4 md:text-[2.25rem] md:leading-[1.1] md:tracking-[0.06em] lg:mt-5 lg:mb-[1rem] lg:text-[2.75rem] lg:leading-[1.08] lg:tracking-[0.09em]">
                Unlimited dental care
                <br />
                across Los Angeles
              </h1>
              <CheckoutLink
                className="motion-safe:animate-slide-in-ltr motion-safe:[animation-delay:320ms] mt-2 inline-flex rounded-lg bg-[#FFF86B] px-2.5 py-1.5 text-[0.7rem] font-bold text-black tracking-[0.03em] shadow-sm transition-opacity hover:opacity-90 sm:mt-4 sm:rounded-[12px] sm:px-4 sm:py-2.5 sm:text-[0.8125rem] sm:tracking-[0.05em] md:mt-6 md:rounded-[14px] md:px-8 md:py-3 md:text-base md:tracking-[0.07em] lg:mt-8"
              >
                Get Started – $297/year
              </CheckoutLink>
              <p className="motion-safe:animate-slide-in-ltr motion-safe:[animation-delay:480ms] mt-2 flex flex-col items-start gap-y-0.5 text-[0.625rem] font-bold leading-snug text-black sm:mt-4 sm:gap-y-1 sm:text-[0.75rem] md:mt-6 md:gap-y-1.5 md:text-[0.9375rem] lg:mt-8 lg:ml-[27px] lg:text-base">
                <span className="whitespace-nowrap">✓ Unlimited Cleanings</span>
                <span className="whitespace-nowrap">✓ Unlimited X-Rays</span>
                <span className="whitespace-nowrap">✓ Unlimited Exams</span>
              </p>
            </div>
          </div>

          {/* ── Right: image — viewport right edge, flush bottom, original size ── */}
          <div className="relative z-10 w-full self-end lg:mt-0">
            <div
              aria-hidden
              className="ml-auto w-full h-[227px] md:h-[399px] lg:h-[632px] xl:h-[520px] 2xl:h-[498px] lg:max-w-[min(100%,580px)] xl:max-w-[640px]"
            />
            <div
              className="absolute bottom-0 right-0 2xl:right-[-223px] xl:right-[-62px] z-10 ml-auto flex w-full items-end lg:max-w-[min(100%,580px)] xl:max-w-[640px]"
              role="img"
              aria-label="Woman holding a card"
            >
              <HeroScrollRotateImage />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
