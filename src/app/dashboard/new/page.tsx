import { Container } from "@/components/container";
import Link from "next/link";

export default function NewTicket() {
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
        <form className="flex flex-col mt-6">
          <label className="mb-1 font-medium text-lg">Novo chamado</label>
          <input
            type="text"
            placeholder="digite o nome do chamado"
            required
            className="w-full border-2 rounded-md px-2 mb-2 h-11"
          />
          <label className="mb-1 font-medium text-lg">
            Descreva o problema
          </label>
          <textarea
            className="w-full border-2 rounded-md px-2 mb-2 h-24 resize-none"
            placeholder="Descreva o problema"
          ></textarea>
          <label className="mb-1 font-medium text-lg">
            Selecione o cliente
          </label>
          <select className="w-full border-2 rounded-md px-2 mb-2 h-11 bg-white">
            <option value="cliente 1">cliente 1</option>
          </select>
        </form>
      </main>
    </Container>
  );
}
