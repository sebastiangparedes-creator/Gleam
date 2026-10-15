import Image from "next/image";
import { CheckoutLink } from "@/components/analytics/CheckoutLink";
import { PricingViewTracker } from "@/components/analytics/PricingViewTracker";



const annualFeatures = [
  "Free professional whitening - use anytime",
  "Priority booking at all 6 locations",
  "Free consultation on any service",
  "Cancel anytime",
] as const;

function CheckItem({ children }: { children: string }) {
  return (
    <li className="flex gap-2.5 text-xs leading-snug text-white sm:gap-3 sm:text-sm md:text-base lg:gap-3">
      <span className="mt-0.5 shrink-0 text-[11px] font-bold text-[#FFF86B] sm:text-[12px]" aria-hidden>
        ✓
      </span>
      <span className="text-[12px] font-bold tracking-[0.02em] text-white sm:text-[13px]">{children}</span>
    </li>
  );
}

type CompareCell = string | "check";

function GreenCheck() {
  return (
    <div
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#22C55E] lg:h-7 lg:w-7"
      aria-label="Included"
      role="img"
    >
      <Image
        src="/assets/tick.svg"
        alt=""
        width={16}
        height={16}
        className="h-3.5 w-3.5 object-contain lg:h-4 lg:w-4"
        aria-hidden
      />
    </div>
  );
}

function CompareCellContent({ value }: { value: CompareCell }) {
  if (value === "check") return <GreenCheck />;
  return <div className="break-words leading-snug lg:break-normal">{value}</div>;
}

const comparisonRows: {
  label: string;
  traditional: CompareCell;
  wally: CompareCell;
  gleam: CompareCell;
}[] = [
  {
    label: "Annual cost",
    traditional: "$480–$960 + copays",
    wally: "$249/yr",
    gleam: "$297/yr",
  },
  {
    label: "Unlimited cleanings",
    traditional: "2× a year, with copays",
    wally: "check",
    gleam: "check",
  },
  {
    label: "Whitening",
    traditional: "Never",
    wally: "Extra cost",
    gleam: "Part of the deal",
  },
  {
    label: "You get a cavity",
    traditional: "Deductible first, then they pay some",
    wally: "Book somewhere else",
    gleam: "Handled. Same visit.",
  },
  {
    label: "You need an implant",
    traditional: '$1,500+ after insurance "helps"',
    wally: "We only do cleanings",
    gleam: "One price. No surprises.",
  },
  {
    label: "You need a crown",
    traditional: "Partial coverage, surprise bill later",
    wally: "That's not us",
    gleam: "Handled.",
  },
  {
    label: "You hit your limit",
    traditional: "Cut off at $1,500. Bill arrives anyway",
    wally: "This isn't even a conversation we can have",
    gleam: "There is no limit.",
  },
  {
    label: "Cancel anytime",
    traditional: "Locked in for the year",
    wally: "check",
    gleam: "check",
  },
];

export function PricingSection() {
  return (
    <section
      id="become-a-member"
      className="relative scroll-mt-24 overflow-x-hidden bg-[#2A2A2A] px-4 py-6 font-helvetica-neue-regular md:scroll-mt-28 md:px-8 md:py-10 lg:py-4"
      aria-labelledby="pricing-tagline"
    >
      <PricingViewTracker targetId="become-a-member" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="relative isolate mx-auto w-full max-w-6xl px-2 md:px-4">
          <div className="relative mb-12 grid w-full place-items-center sm:mt-7  lg:mt-0">
            <h2
              id="pricing-tagline"
              className="col-start-1 row-start-1 z-10 min-w-full translate-y-[1.1rem] px-2 text-center text-[1.3rem] font-bold uppercase leading-snug tracking-[0.05em] text-white [word-spacing:0.16em] sm:translate-y-[1.35rem] sm:px-3 sm:text-[1.4rem] sm:tracking-[0.055em] sm:[word-spacing:0.18em] md:translate-y-8 md:text-[1.55rem] md:tracking-[0.065em] md:[word-spacing:0.22em] lg:translate-y-14 lg:text-[2.2rem] lg:leading-snug lg:tracking-[0.09em] lg:pb-[73px] lg:text-[47px] lg:[word-spacing:0.34em]"
            >
              The last dental plan you&apos;ll ever need.
            </h2>
          </div>
        </div>

        <div className="mt-6 flex justify-center md:mt-8 lg:mt-10">
          {/* Annual */}
          <article className="flex w-full max-w-[34rem] flex-col rounded-[38px] border-2 border-transparent bg-[#1A1A1A] p-4 shadow-xl transition-colors hover:border-[#FDFD66] sm:p-6 md:p-8 lg:p-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-[17px] font-bold uppercase tracking-[0.09em] text-[#999999] sm:text-[18px] lg:text-[20px]">
                Annual
              </span>
              <span className="flex w-full max-w-[150px] items-center justify-center rounded-[10px] bg-[#FFF86B] px-3 py-1 text-[12px] font-bold uppercase tracking-wide text-[#3A3A00] sm:w-[150px] sm:max-w-none lg:w-[150px]">
                Best Value
              </span>
            </div>

            <h3 className="mt-5 text-[1.25rem] font-bold tracking-[0.02em] text-white sm:mt-6 sm:text-[1.5rem] md:text-[1.625rem] lg:mt-6 lg:text-[28px]">
              Everything, all year. Plus a free whitening
            </h3>
            <p className="text-[15px] font-semibold tracking-[0.02em] text-[#C2C0B6]">
              Full access from day one — brighter smile included.
            </p>

            <div className="mt-4">
              <p className="text-[1.625rem] font-bold tracking-[0.02em] text-white sm:text-[1.75rem] md:text-4xl lg:text-4xl">
                $297{" "}
                <span className="text-[15px] font-semibold text-[#C2C0B6] sm:text-[16px] lg:text-[18px]">
                  /year
                </span>
              </p>
              
            </div>

            <CheckoutLink
              className="mt-4 inline-flex w-[9.375rem] lg:w-[17.375rem] md:w-[17.375rem] items-center justify-start gap-2 rounded-xl bg-[#FFF86B] py-3 text-center text-base pl-[1.2rem] pr-[0.5rem] lg:px-3 md:px-2 font-bold tracking-[0.02em] text-[#000000] transition-opacity hover:opacity-90 sm:py-3.5 sm:text-[17px] lg:py-3.5 lg:text-[18px]"
            >
              Get Started <span aria-hidden>→</span>
            </CheckoutLink>

            <div className="mt-6 mb-1 h-px w-full bg-white/10" />

            

            <ul className="mt-6 flex flex-col gap-3">
              {annualFeatures.map((item) => (
                <CheckItem key={item}>{item}</CheckItem>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-10 lg:mt-14">
          <p className="sr-only">Compare traditional insurance, other subscriptions, and Gleam</p>
          <div className="-mx-4 overflow-x-auto px-4 pb-2 md:mx-0 md:overflow-visible md:px-0">
            
            <div
              className="grid min-w-[44rem] grid-cols-[minmax(8.5rem,1fr)_repeat(3,minmax(0,1fr))] gap-x-0 md:min-w-0 [&>*]:"
              role="table"
              aria-label="Plan comparison"
            >
              <div
                className="flex items-end border-b border-white/20 px-3 py-3 pr-2 text-left sm:px-4 sm:py-4 sm:pr-3 md:px-5 md:py-5 md:pr-4"
                role="columnheader"
              />
              <div
                className="overflow-hidden rounded-t-[30px] bg-black px-3 py-3 text-left text-[13px] font-bold  leading-tight tracking-[0.03em] text-white sm:px-4 sm:py-4 sm:text-[14px] md:px-5 md:py-5 md:text-[15px]"
                role="columnheader"
              >
                Traditional
                <div className="mt-0.5 text-[12px] text-[#CFCFCF] sm:text-[13px] md:text-[15px]">
                ɪnsurance
                </div>
              </div>
              <div
                className="overflow-hidden rounded-t-[30px] bg-[#2A2A2A] px-3 py-3 text-left text-[13px] font-bold uppercase leading-tight tracking-[0.03em] text-white sm:px-4 sm:py-4 sm:text-[14px] md:px-5 md:py-5 md:text-[15px]"
                role="columnheader"
              >
                Other Subscriptions{" "}
                <div className="mt-0.5 text-[12px] normal-case tracking-normal text-[#CFCFCF] sm:text-[13px] md:text-[15px]">
                  i.e. Wally
                </div>
              </div>
              <div
                className="overflow-hidden rounded-t-[30px] bg-[#FFF86B] px-3 py-3 text-left text-[13px] font-bold uppercase leading-tight tracking-[0.03em] text-[#1A1A1A] sm:px-4 sm:py-4 sm:text-[14px] md:px-5 md:py-5 md:text-[15px]"
                role="columnheader"
              >
                Gleam
              </div>

              {comparisonRows.flatMap((row) => [
                <div
                  key={`${row.label}-label`}
                  className="flex items-start border-b border-white/20 px-3 py-3 pr-2 text-left text-[13px] font-bold tracking-[0.08em] text-white sm:px-4 sm:py-3.5 sm:pr-3 sm:text-[14px] md:px-5 md:py-4 md:pr-4 md:text-[15px]"
                  role="rowheader"
                >
                  {row.label}
                </div>,
                <div
                  key={`${row.label}-traditional`}
                  className="flex items-start  bg-black px-3 py-3 text-left text-[13px] font-semibold tracking-[0.03em] text-white sm:px-4 sm:py-3.5 sm:text-[14px] md:px-5 md:py-4 md:text-[15px] min-h-[24px]"
                  role="cell"
                >
                  <CompareCellContent value={row.traditional} />
                </div>,
                <div
                  key={`${row.label}-wally`}
                  className="flex items-start  bg-[#2A2A2A] px-3 py-3 text-left text-[13px] font-semibold tracking-[0.03em] text-white sm:px-4 sm:py-3.5 sm:text-[14px] md:px-5 md:py-4 md:text-[15px]"
                  role="cell"
                >
                  <CompareCellContent value={row.wally} />
                </div>,
                <div
                  key={`${row.label}-gleam`}
                  className="flex items-start  bg-[#FFF86B] px-3 py-3 text-left text-[13px] font-semibold tracking-[0.03em] text-black sm:px-4 sm:py-3.5 sm:text-[14px] md:px-5 md:py-4 md:text-[15px]"
                  role="cell"
                >
                  <CompareCellContent value={row.gleam} />
                </div>,
              ])}

              <div className="min-h-6 md:min-h-8" aria-hidden />
              <div className="min-h-6 bg-black md:min-h-8" aria-hidden />
              <div className="min-h-6 bg-[#2A2A2A] md:min-h-8" aria-hidden />
              <div
                className="min-h-6 bg-[#FFF86B] md:min-h-8"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
