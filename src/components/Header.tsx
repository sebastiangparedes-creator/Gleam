"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { CheckoutLink } from "@/components/analytics/CheckoutLink";

/** Homepage header background on `/` — applied at `md` breakpoint and above (tablet / desktop). */
const homeHeaderBackground =
  "linear-gradient(118.99deg, rgba(250, 243, 107, 0.8) 15.59%, rgba(252, 247, 159, 0.518) 26.8%, rgba(255, 255, 255, 0) 60.13%)";

/** 50/50 yellow/white header on `/services` — applied below `md` (phone only). */
const mobileHeaderSplitBg =
  "linear-gradient(to right, #FFF86B 50%, #FFFFFF 50%)";

/** Homepage header background on `/` — applied below `md` (phone only). */
const homeHeaderBackgroundSm = "#FFF86B";

export type HeaderNavLink = {
  href: string;
  label: string;
};

export type HeaderProps = {
  /** Override the primary nav links. Defaults to the homepage links. */
  navLinks?: ReadonlyArray<HeaderNavLink>;
  /** Brand text shown on the left. Defaults to "Gleam". */
  brandLabel?: string;
  /** Where the brand links to. Defaults to "/". */
  brandHref?: string;
  /** Force-hide the entire header. Default: auto (hidden on auth-shell pages). */
  hidden?: boolean;
  /** Optional homepage header `background` override. Matches the hero wash on `/` when omitted. */
  bg?: string;
};

const defaultNavLinks: ReadonlyArray<HeaderNavLink> = [
  { href: "/services", label: "our services" },
  { href: "/#become-a-member", label: "pricing" },
  { href: "/locations", label: "locations" },
];

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      className="h-6 w-6 text-neutral-900"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      {open ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      )}
    </svg>
  );
}

export function Header({
  navLinks,
  brandLabel = "gleam",
  brandHref = "/",
  hidden,
  bg,
}: HeaderProps = {}) {
  const pathname = usePathname();
  const isAuthShellPage =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgot-password" ||
    pathname === "/reset-password";
  const menuId = useId();
  const [menuOpen, setMenuOpen] = useState(false);
  const isServicesPage = pathname?.startsWith("/services");
  const resolvedNavLinks: ReadonlyArray<HeaderNavLink> =
    navLinks ??
    (isServicesPage
      ? defaultNavLinks.filter(({ label }) => label !== "Locations")
      : defaultNavLinks);
  const isHidden = hidden ?? isAuthShellPage;
  const isHome = pathname === "/";
  const headerBackground = isHome ? (bg ?? homeHeaderBackground) : undefined;
  const useResponsiveGradient = isHome && !bg;
  const useHeroScrollBg = useResponsiveGradient || isServicesPage;
  const [pastHeroHalf, setPastHeroHalf] = useState(false);
  const showHomeGradient = useResponsiveGradient && !pastHeroHalf;
  const showServicesMobileSplit = isServicesPage && !pastHeroHalf;
  const useWhiteBg = !showHomeGradient && (!headerBackground || pastHeroHalf);

  useEffect(() => {
    if (!useHeroScrollBg) {
      setPastHeroHalf(false);
      return;
    }

    const updatePastHeroHalf = () => {
      let hero: HTMLElement | null = null;

      if (isHome) {
        const mobileHero = document.getElementById("hero");
        const desktopHero = document.getElementById("hero-desktop");
        hero =
          mobileHero && mobileHero.offsetHeight > 0
            ? mobileHero
            : desktopHero && desktopHero.offsetHeight > 0
              ? desktopHero
              : mobileHero ?? desktopHero;
      } else if (isServicesPage) {
        hero = document.getElementById("services-hero");
      }

      if (!hero) {
        setPastHeroHalf(false);
        return;
      }
      const heroTop = window.scrollY + hero.getBoundingClientRect().top;
      setPastHeroHalf(window.scrollY >= heroTop + hero.offsetHeight / 4);
    };

    updatePastHeroHalf();
    window.addEventListener("scroll", updatePastHeroHalf, { passive: true });
    window.addEventListener("resize", updatePastHeroHalf);
    return () => {
      window.removeEventListener("scroll", updatePastHeroHalf);
      window.removeEventListener("resize", updatePastHeroHalf);
    };
  }, [useHeroScrollBg, isHome, isServicesPage, pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  if (isHidden) return null;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-neutral-200/80 ${
        showHomeGradient
          ? "[background:var(--header-bg-mobile)] md:[background:var(--header-bg-desktop)]"
          : showServicesMobileSplit
            ? "max-md:[background:var(--header-bg-mobile-split)] md:bg-white"
            : useWhiteBg
              ? "bg-white"
              : ""
      }`}
      style={
        showHomeGradient
          ? ({
              "--header-bg-mobile": homeHeaderBackgroundSm,
              "--header-bg-desktop": homeHeaderBackground,
            } as React.CSSProperties)
          : showServicesMobileSplit
            ? ({
                "--header-bg-mobile-split": mobileHeaderSplitBg,
              } as React.CSSProperties)
            : headerBackground && !pastHeroHalf
              ? { background: headerBackground }
              : undefined
      }
    >
      {menuOpen ? (
        <button
          type="button"
          className="fixed inset-0 top-16 z-30 bg-neutral-900/35 md:top-[4.5rem] lg:hidden"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}
      <div className="relative z-40 flex h-16 w-full items-center justify-between gap-3 px-4 font-bold font-helvetica-neue-regular sm:gap-4 sm:px-6 md:h-[4.5rem] md:px-10">
        <Link
          href={brandHref}
          className="shrink-0 font-britanica-black text-[2.125rem] font-normal text-[#3A3D38] tracking-[0.08em] sm:text-[1.25rem] md:text-[40px] lg:pl-[11.4375rem]"
          onClick={() => setMenuOpen(false)}
        >
          {brandLabel}
        </Link>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3 lg:gap-8">
          <nav className="hidden items-center lg:gap-[3rem] lg:flex" aria-label="Primary">
            {resolvedNavLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="whitespace-nowrap font-alliance-no-2 text-base font-bold text-[21px] text-[#3A3D38] transition-colors hover:text-neutral-950"
              >
                {label}
              </Link>
            ))}
          </nav>

          <CheckoutLink
            className={`hidden rounded-[12px] px-5 py-2.5 text-base text-[21px] font-bold text-neutral-900 shadow-sm transition-opacity hover:opacity-90 lg:inline-flex ${
              useWhiteBg ? "border-2 border-black bg-white" : "bg-[#FFF86B]"
            }`}
          >
            Become a Member
          </CheckoutLink>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-900 transition-colors hover:bg-neutral-50 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>

        {/* Mobile / tablet menu */}
        <div
          id={menuId}
          className={`absolute left-0 right-0 top-full border-b border-neutral-200 bg-white shadow-lg transition-[visibility,opacity,transform] duration-200 ease-out lg:hidden ${
            menuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0 pointer-events-none"
          }`}
          aria-hidden={!menuOpen}
        >
          <nav
            className="flex max-h-[min(70vh,calc(100dvh-5rem))] flex-col gap-1 overflow-y-auto px-4 py-4 sm:px-6"
            aria-label="Primary mobile"
          >
            {resolvedNavLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="rounded-lg px-3 py-3.5 font-alliance-no-2 text-lg font-normal text-neutral-800 transition-colors hover:bg-neutral-50 hover:text-neutral-950 active:bg-neutral-100 sm:py-3 sm:text-base"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <CheckoutLink
              onClick={() => setMenuOpen(false)}
              className={`mt-2 rounded-[12px] px-4 py-3.5 text-center text-base font-bold text-neutral-900 shadow-sm transition-opacity hover:opacity-90 sm:mt-3 ${
                useWhiteBg ? "border-2 border-black bg-white" : "bg-[#FFF86B]"
              }`}
            >
              Become a Member
            </CheckoutLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
