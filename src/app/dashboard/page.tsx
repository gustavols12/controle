import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { TicketItem } from "./components/ticket";
import prisma from "@/lib/prisma";
import { ButtonRefrash } from "./components/button";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/");
  }
  const tickets = await prisma.ticket.findMany({
    where: {
      status: "ABERTO",
      customer: {
        userId: session.user.id,
      },
    },
    include: {
      customer: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Chamados</h1>
          <div className="flex items-center justify-center gap-2">
            <Link
              className="bg-blue-500 px-4 py-1 rounded text-white"
              href="/dashboard/new"
            >
              Abrir Chamado
            </Link>
            <ButtonRefrash />
          </div>
        </div>
        <table className="min-w-full my-2">
          <thead>
            <tr>
              <th className="font-medium text-left pl-2">CLIENTE</th>
              <th className="font-medium text-left">CADASTRO</th>
              <th className="font-medium text-left">STATUS</th>
              <th className="font-medium text-left">AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <TicketItem
                key={ticket.id}
                ticket={ticket}
                customer={ticket.customer}
              />
            ))}
          </tbody>
        </table>
        {tickets.length === 0 && (
          <h1 className=" px-2 md:px-0text-gray-600">
            Nenhum ticket em aberto encontrado...
          </h1>
        )}
      </main>
    </Container>
  );
}
