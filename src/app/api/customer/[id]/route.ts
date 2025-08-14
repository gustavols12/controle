import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const session = await getServerSession(authOptions);

  if (!id) {
    return NextResponse.json(
      { message: "Cliente com ticket em aberto ou não encontrado" },
      { status: 400 }
    );
  }

  const findTickets = await prisma.ticket.findFirst({
    where: { customerId: id },
  });

  if (findTickets) {
    return NextResponse.json(
      { message: "Cliente com ticket em aberto ou não encontrado" },
      { status: 400 }
    );
  }

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await prisma.customer.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Customer deleted successfully" });
  } catch {
    return NextResponse.json(
      { error: "Failed to Delete customer" },
      { status: 500 }
    );
  }
}
