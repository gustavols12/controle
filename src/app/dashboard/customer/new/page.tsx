import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { NewCustomerForm } from "../components/form";

export default async function NewCustomer() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }
  return (
    <Container>
      <main className="flex flex-col mt-9 mb-2 gap-2 ">
        <div className="flex gap-2 items-center">
          <Link
            href="/dashboard/customer"
            className="bg-gray-800 rounded-lg py-2 px-4 text-white"
          >
            Voltar
          </Link>
          <h1 className="text-3xl font-bold"> + Novo cliente</h1>
        </div>
        <NewCustomerForm userId={session.user.id} />
      </main>
    </Container>
  );
}
