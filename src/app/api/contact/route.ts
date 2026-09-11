import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { saveLead } from "@/lib/db/store";
import { notify } from "@/lib/email/send";
import type { LeadInput } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Handles both the contact form and the corporate account request form. */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Send valid JSON." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Check the details and try again." },
      { status: 422 },
    );
  }

  const c = parsed.data;
  const lead: LeadInput = {
    kind: c.source === "corporate" ? "corporate" : "contact",
    firstName: c.firstName,
    lastName: c.lastName || "",
    phone: c.phone || "",
    email: c.email,
    company: c.company || null,
    tripType: null,
    pickup: null,
    dropoff: null,
    pickupAt: null,
    returnAt: null,
    durationHours: null,
    passengers: null,
    vehicleId: null,
    flightNumber: null,
    notes: c.notes,
    estimateCents: null,
    paymentStatus: null,
    paymentRef: null,
    source: c.source || "contact",
    referrer: c.referrer ?? null,
    utm: c.utm && Object.keys(c.utm).length ? c.utm : null,
  };

  try {
    const saved = await saveLead(lead);
    await notify(saved).catch((err) => console.error("[contact] notify failed", err));
    return NextResponse.json({ id: saved.id }, { status: 201 });
  } catch (err) {
    console.error("[contact] save failed", err);
    return NextResponse.json({ error: "We could not send that. Please try again." }, { status: 500 });
  }
}
