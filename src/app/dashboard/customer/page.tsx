import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Cardcustomer } from "./components/card";
import prisma from "@/lib/prisma";

export default async function Customer() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/");
  }

  const customers = prisma.customer.findMany({
    where: { userId: session.user.id },
  });
  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Meus clientes</h1>
          <Link
            href="/dashboard/customer/new"
            className="bg-blue-500 rounded-lg py-2 px-4 text-white"
          >
            Novo cliente
          </Link>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
          {(await customers).map((customer) => (
            <Cardcustomer key={customer.id} customer={customer} />
          ))}
        </section>
      </main>
    </Container>
  );
}
