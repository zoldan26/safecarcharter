import Link from "next/link";
import { HeroBooking } from "./HeroBooking";
import { ImageSlot } from "@/components/site/ImageSlot";
import { PhoneLink } from "@/components/site/PhoneLink";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-paper">
      {/* Photography slot: a black sedan at a downtown Columbus curb.
          Drop the file in /public and pass src="/hero.jpg" to replace it. */}
      <ImageSlot
        src={null}
        alt="A black sedan waiting at a downtown Columbus curb"
        tone="dark"
        priority
        sizes="100vw"
        className="absolute inset-0 -z-10 h-full w-full"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(16,17,19,.94),rgba(16,17,19,.72))]"
      />

      <div className="u-wrap grid gap-10 py-14 md:py-20 lg:grid-cols-[1.05fr_26rem] lg:items-center lg:gap-16 lg:py-24">
        <div className="hero-rise">
          <p className="text-[0.875rem] text-paper/55">Columbus, Ohio</p>
          <h1 className="mt-4 text-[var(--text-h1)]">
            Private transportation.
            <br />
            Professionally driven.
          </h1>
          <p className="u-measure-wide mt-6 text-[var(--text-lede)] leading-relaxed text-paper/70">
            Premium black car service throughout Columbus and Central Ohio — airport transfers,
            corporate travel, events, hourly service and private trips, with a professional driver
            every time.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/book" className="btn btn-inverse sm:min-w-[11rem]">
              Book a ride
            </Link>
            <Link href="/quote" className="btn btn-outline-light sm:min-w-[11rem]">
              Get a quote
            </Link>
            <PhoneLink location="hero" className="btn btn-outline-light sm:min-w-[11rem]">
              Call reservations
            </PhoneLink>
          </div>
        </div>

        <div className="text-ink lg:sticky lg:top-24">
          <HeroBooking />
        </div>
      </div>
    </section>
  );
}
