import { NextResponse as res } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const tickets = await db.ticket.findMany();
    return res.json(tickets, { status: 200 });
  } catch (error) {
    return res.json({ message: "Error", error }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const request = body.formData;

    await db.ticket.create({ data: { ...request } });

    return res.json({ message: "Ticket Created" }, { status: 201 });
  } catch (err) {
    return res.json({ message: "Error", err }, { status: 500 });
  }
}
