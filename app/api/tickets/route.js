import { NextResponse as res } from "next/server";
import { Ticket } from "@/models/ticket";

export async function GET() {
  try {
    const tickets = await Ticket.find();
    return res.json({ tickets }, { status: 200 });
  } catch (error) {
    return res.json({ message: "Error", error }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const ticketData = body.formData;

    await Ticket.create(ticketData);

    return res.json({ message: "Ticket Created" }, { status: 201 });
  } catch (err) {
    return res.json({ message: "Error", err }, { status: 500 });
  }
}
