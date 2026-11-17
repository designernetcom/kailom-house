import { NextResponse } from "next/server";

type EnquiryBody = Record<string, unknown>;

function stringValue(body: EnquiryBody, field: string) {
  const value = body[field];
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let body: EnquiryBody;

  try {
    const parsed: unknown = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return NextResponse.json({ error: "Please submit a valid enquiry." }, { status: 400 });
    }
    body = parsed as EnquiryBody;
  } catch {
    return NextResponse.json({ error: "Please submit a valid enquiry." }, { status: 400 });
  }

  const fullName = stringValue(body, "fullName");
  const email = stringValue(body, "email");
  const phone = stringValue(body, "phone");
  const message = stringValue(body, "message");
  const fields: Record<string, string> = {};

  if (!fullName) fields.fullName = "Full name is required.";
  if (!email) {
    fields.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    fields.email = "Enter a valid email address.";
  }
  if (!phone) {
    fields.phone = "Phone number is required.";
  } else if (!/^[+()\d\s-]{7,20}$/.test(phone)) {
    fields.phone = "Enter a valid phone number.";
  }
  if (!message) fields.message = "Message / requirements is required.";
  if (!stringValue(body, "productName") || !stringValue(body, "modelNumber") || !stringValue(body, "productUrl")) {
    fields.product = "Product context is missing.";
  }

  if (Object.keys(fields).length > 0) {
    return NextResponse.json({ error: "Please correct the highlighted fields.", fields }, { status: 400 });
  }

  return NextResponse.json({
    message: "Your enquiry is ready. Online delivery will be connected in the next phase.",
    mode: "static-preview",
  });
}
