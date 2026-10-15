import Image from "next/image";
import { CheckoutLink } from "@/components/analytics/CheckoutLink";
import { LocationMarqueeBar } from "@/components/LocationMarqueeBar";

const heroMobileBackground =
  "radial-gradient(50% 50% at 50% 50%, #FFFFFF 0%, #FFF86B 100%)";

const locations = ["weho", "encino", "calabasas", "northridge", "la puente", "corona"] as const;

const tickIconClass =
  "h-[clamp(0.5rem,1.35vh,0.75rem)] w-[clamp(0.625rem,1.65vh,0.875rem)] shrink-0 object-contain";

export function HeroMobile() {
  return (
    <div
      id="hero"
      className="relative -mt-16 flex min-h-[76dvh] flex-col overflow-hidden font-britanica-black md:hidden"
      style={{ background: heroMobileBackground }}
    >
      <div className="flex flex-1 flex-col justify-evenly px-4 pt-[calc(4rem+clamp(1.25rem,5vh,2.75rem))] pb-[clamp(0.75rem,2vh,1.25rem)]">
        <div className="mx-auto flex w-full max-w-lg flex-col items-center justify-evenly gap-[clamp(1.5rem,4.5vh,2.75rem)] text-center">
          <div className="flex flex-col items-center gap-[clamp(0.75rem,2vh,1.25rem)]">
            <p className="motion-safe:animate-slide-in-ltr motion-safe:[animation-delay:160ms] text-[clamp(1.125rem,2.65vh,1.375rem)] font-bold tracking-wide text-black">
              One Annual Membership
            </p>
            <h1 className="motion-safe:animate-slide-in-ltr motion-safe:[animation-delay:160ms] text-[clamp(1.75rem,4.25vh,10.375rem)] font-semibold leading-[1.12] tracking-wide text-black">
              Unlimited dental care
              <br />
              across Los Angeles
            </h1>
          </div>
          <CheckoutLink
            className="motion-safe:animate-slide-in-ltr motion-safe:[animation-delay:320ms] inline-flex rounded-full bg-white px-[clamp(1rem,4.5vw,1.75rem)] py-[clamp(0.5rem,1.65vh,0.875rem)] text-[clamp(0.8125rem,2vh,1rem)] font-bold text-black tracking-wide shadow-md transition-opacity hover:opacity-90"
          >
            Get Started – $297/year
          </CheckoutLink>
          <div className="motion-safe:animate-slide-in-ltr motion-safe:[animation-delay:480ms] flex justify-center">
            <div className="flex flex-col items-start gap-y-[clamp(0.375rem,1.35vh,0.75rem)] text-[clamp(0.9375rem,2.15vh,1.0625rem)] font-bold leading-[1rem] text-black">
              <span className="flex items-center gap-[clamp(0.375rem,1.1vh,0.625rem)] whitespace-nowrap">
                <Image
                  src="/assets/tick1.svg"
                  alt=""
                  width={14}
                  height={11}
                  className={tickIconClass}
                  aria-hidden
                />
                Unlimited Cleanings
              </span>
              <span className="flex items-center gap-[clamp(0.375rem,1.1vh,0.625rem)] whitespace-nowrap">
                <Image
                  src="/assets/tick1.svg"
                  alt=""
                  width={14}
                  height={11}
                  className={tickIconClass}
                  aria-hidden
                />
                Unlimited X-Rays
              </span>
              <span className="flex items-center gap-[clamp(0.375rem,1.1vh,0.625rem)] whitespace-nowrap">
                <Image
                  src="/assets/tick1.svg"
                  alt=""
                  width={14}
                  height={11}
                  className={tickIconClass}
                  aria-hidden
                />
                Unlimited Exams
              </span>
            </div>
          </div>
        </div>
      </div>

      <LocationMarqueeBar locations={locations} />
    </div>
  );
}
