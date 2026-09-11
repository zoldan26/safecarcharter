import { NextResponse } from "next/server";
import { quoteSchema } from "@/lib/validation";
import { saveLead } from "@/lib/db/store";
import { notify } from "@/lib/email/send";
import type { LeadInput } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Send valid JSON." }, { status: 400 });
  }

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Check the details and try again." },
      { status: 422 },
    );
  }

  const q = parsed.data;
  const lead: LeadInput = {
    kind: "quote",
    firstName: q.firstName,
    lastName: q.lastName || "",
    phone: q.phone,
    email: q.email,
    company: null,
    tripType: "one-way",
    pickup: q.pickup,
    dropoff: q.dropoff,
    pickupAt: `${q.date}T${q.time}`,
    returnAt: null,
    durationHours: null,
    passengers: q.passengers,
    vehicleId: q.vehicleId === "unsure" ? null : q.vehicleId,
    flightNumber: null,
    notes: q.notes || null,
    estimateCents: null,
    paymentStatus: null,
    paymentRef: null,
    source: q.source || "quote",
    referrer: q.referrer ?? null,
    utm: q.utm && Object.keys(q.utm).length ? q.utm : null,
  };

  try {
    const saved = await saveLead(lead);
    await notify(saved).catch((err) => console.error("[quotes] notify failed", err));
    return NextResponse.json({ id: saved.id }, { status: 201 });
  } catch (err) {
    console.error("[quotes] save failed", err);
    return NextResponse.json(
      { error: "We could not save that request. Call us and we will quote it directly." },
      { status: 500 },
    );
  }
}
