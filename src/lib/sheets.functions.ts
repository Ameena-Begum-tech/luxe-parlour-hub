import { createServerFn } from "@tanstack/react-start";

const SPREADSHEET_ID = "1IU4_5hq6sNKhuZ9D4xflt_WShIVfdu-NJjavRA3IGAk";
const GATEWAY = "https://connector-gateway.lovable.dev/google_sheets";

async function appendRow(sheet: string, row: (string | number)[]) {
  const lovKey = process.env.LOVABLE_API_KEY;
  const gKey = process.env.GOOGLE_SHEETS_API_KEY;
  if (!lovKey || !gKey) throw new Error("Google Sheets is not configured");

  const url = `${GATEWAY}/v4/spreadsheets/${SPREADSHEET_ID}/values/${sheet}!A:Z:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${lovKey}`,
      "X-Connection-Api-Key": gKey,
    },
    body: JSON.stringify({ values: [row] }),
  });
  if (!res.ok) {
    const body = await res.text();
    console.error(`Sheets append failed [${res.status}]: ${body}`);
    throw new Error(`Could not save to Google Sheets (${res.status})`);
  }
}

export type BookingPayload = {
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  time: string;
  location: "At Parlour" | "At Home";
  address: string;
  notes: string;
};

export const submitBooking = createServerFn({ method: "POST" })
  .inputValidator((data: BookingPayload) => {
    if (!data?.name?.trim() || !data?.phone?.trim() || !data?.service?.trim() || !data?.date || !data?.time || !data?.location) {
      throw new Error("Missing required booking fields");
    }
    return data;
  })
  .handler(async ({ data }) => {
    await appendRow("Appointments", [
      new Date().toISOString(),
      data.name.trim().slice(0, 100),
      data.phone.trim().slice(0, 20),
      (data.email ?? "").trim().slice(0, 120),
      data.service.slice(0, 80),
      data.date,
      data.time,
      data.location,
      (data.address ?? "").trim().slice(0, 300),
      (data.notes ?? "").trim().slice(0, 500),
    ]);
    return { ok: true as const };
  });

export type ContactPayload = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
};

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data: ContactPayload) => {
    if (!data?.name?.trim() || !data?.phone?.trim() || !data?.message?.trim()) {
      throw new Error("Please fill in name, phone and message");
    }
    return data;
  })
  .handler(async ({ data }) => {
    await appendRow("Contacts", [
      new Date().toISOString(),
      data.name.trim().slice(0, 100),
      data.phone.trim().slice(0, 20),
      (data.email ?? "").trim().slice(0, 120),
      (data.service ?? "").slice(0, 80),
      data.message.trim().slice(0, 1000),
    ]);
    return { ok: true as const };
  });