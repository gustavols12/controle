import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { error } from "console";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {}

export async function PATCH(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const { id } = await request.json();

  const findTicket = await prisma.ticket.findFirst({
    where: {
      id: id as string,
    },
  });

  if (!findTicket)
    return NextResponse.json(
      { Error: "failed update ticket" },
      { status: 400 }
    );

  try {
    await prisma.ticket.update({
      where: {
        id: id as string,
      },
      data: {
        status: "FECHADO",
      },
    });
    return NextResponse.json({ message: "chamado atualzado" });
  } catch {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }
}
