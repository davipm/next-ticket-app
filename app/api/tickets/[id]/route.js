import { NextResponse as res } from "next/server";
import { db } from "@/lib/db";

export async function GET(request, { params }) {
  const { id } = params;

  const ticket = await db.ticket.findUnique({ where: { id } });
  return res.json(ticket, { status: 200 });
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;

    const body = await req.json();
    const response = body.formData;

    await db.ticket.update({ where: { id }, data: { ...response } });

    return res.json({ message: "Ticket updated" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Error", error }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    await db.ticket.delete({ where: { id } });
    return res.json({ message: "Ticket Deleted" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Error", error }, { status: 500 });
  }
}
