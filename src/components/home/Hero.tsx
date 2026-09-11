import Link from "next/link";
import { HeroBooking } from "./HeroBooking";
import { ImageSlot } from "@/components/site/ImageSlot";
import { PhoneLink } from "@/components/site/PhoneLink";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-paper">
      {/* Replace /public/hero.jpg to change this. Wide crop: the subject sits
          centre-frame so the cover-crop holds at phone aspect ratios. */}
      <ImageSlot
        src="/hero.jpg"
        alt="A chauffeur holding the rear door of a black SUV open for an arriving passenger"
        tone="dark"
        priority
        sizes="100vw"
        className="absolute inset-0 -z-10 h-full w-full"
      />
      {/* Two overlays: a flat scrim on phones, where the crop is tight and the
          headline sits directly over the vehicle, and a left-to-right gradient
          from large screens up, which lets the photograph carry the right side. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[rgba(10,11,12,.78)] lg:bg-[linear-gradient(to_right,rgba(10,11,12,.92)_0%,rgba(10,11,12,.74)_46%,rgba(10,11,12,.34)_100%)]"
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
