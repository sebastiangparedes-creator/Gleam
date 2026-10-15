import type { Metadata } from "next";
import { Baloo_2, DM_Sans, Space_Mono } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import { metaPixelSnippet, tiktokPixelSnippet } from "@/components/analytics/PixelScripts";
import { Header } from "@/components/Header";
import { ToastProvider } from "@/components/toast/ToastProvider";
import "./globals.css";

const allianceFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-alliance",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSansFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
});

const baloo2 = Baloo_2({
  subsets: ["latin"],
  variable: "--font-baloo-2",
  weight: ["400", "500", "600", "700"],
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Gleam Health",
  description: "Gleam Health — Unlimited dental care across Los Angeles",
  openGraph: {
    title: "Gleam Health",
    description: "Gleam Health — Unlimited dental care across Los Angeles",
    images: [
      {
        url: "/assets/Gleam-Logo.png",
        alt: "Gleam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gleam Health",
    description: "Gleam Health — Unlimited dental care across Los Angeles",
    images: ["/assets/Gleam-Logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${baloo2.variable} ${allianceFont.variable} ${dmSansFont.variable} ${spaceMono.variable} min-h-screen bg-white font-[family-name:var(--font-geist-sans)] antialiased text-neutral-900`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MX4WX6S9"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MX4WX6S9');`}
        </Script>
        <Script id="meta-pixel" strategy="beforeInteractive">
          {metaPixelSnippet}
        </Script>
        <Script id="tiktok-pixel" strategy="beforeInteractive">
          {tiktokPixelSnippet}
        </Script>
        <PageViewTracker />
        <ToastProvider>
          <Header />
          <main className="pt-16 md:pt-[4.5rem]">{children}</main>
        </ToastProvider>
      </body>
    </html>
  );
}
