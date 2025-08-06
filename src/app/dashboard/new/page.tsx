import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function NewTicket() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) redirect("/");

  const customers = await prisma.customer.findMany({
    where: {
      userId: session.user.id,
    },
  });
  async function handleRegisterTicket(formData: FormData) {
    "use server";
    const name = formData.get("name");
    const description = formData.get("description");
    const customerId = formData.get("customer");
    if (!name || !description || !customerId) return;

    await prisma.ticket.create({
      data: {
        name: name as string,
        description: description as string,
        customerId: customerId as string,
        status: "ABERTO",
        userId: session?.user.id,
      },
    });
    redirect("/dashboard");
  }

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-white px-4 py-1 rounded bg-gray-900"
          >
            voltar
          </Link>
          <h1 className="text-3xl font-bold">+ Novo Chamado</h1>
        </div>
        <form className="flex flex-col mt-6" action={handleRegisterTicket}>
          <label className="mb-1 font-medium text-lg">Novo chamado</label>
          <input
            type="text"
            placeholder="digite o nome do chamado"
            required
            className="w-full border-2 rounded-md px-2 mb-2 h-11"
            name="name"
          />
          <label className="mb-1 font-medium text-lg">
            Descreva o problema
          </label>
          <textarea
            className="w-full border-2 rounded-md px-2 mb-2 h-24 resize-none"
            placeholder="Descreva o problema"
            required
            name="description"
          ></textarea>
          {customers.length > 0 && (
            <>
              <label className="mb-1 font-medium text-lg">
                Selecione o cliente
              </label>
              <select
                className="w-full border-2 rounded-md px-2 mb-2 h-11 bg-white"
                name="customer"
              >
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </>
          )}

          {customers.length === 0 && (
            <Link href="/dashboard/customer/new">
              Você não possui nenhum cliente cadastrado,{" "}
              <span className="text-blue-500 font-medium">Cadastrar</span>
            </Link>
          )}
          <button
            className="bg-blue-500 text-white font-bold px-2 h-11 rounded-md my-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={customers.length === 0}
          >
            Cadastrar
          </button>
        </form>
      </main>
    </Container>
  );
}
