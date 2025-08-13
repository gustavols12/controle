"use client";

import { Input } from "@/components/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BsSearch } from "react-icons/bs";
import { useState } from "react";
import { FiX } from "react-icons/fi";
import { FormTicket } from "./components/formTicket";

const schema = z.object({
  email: z
    .email("Digite o email do cliente para localizar")
    .min(1, "O campo email é obrigatório"),
});

type FormData = z.infer<typeof schema>;

interface CustomerDataInfo {
  id: string;
  name: string;
}

export default function OpenTicket() {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [customer, setCustomer] = useState<CustomerDataInfo | null>(null);

  function handleClearCustomer() {
    setCustomer(null);
    setValue("email", "");
  }

  async function handleSearchCustomer(data: FormData) {
    const email = data.email;

    const url = `/api/customer?email=${encodeURIComponent(email)}`;

    const response = await fetch(url);
    const json = await response.json();

    if (json == null) {
      setError("email", {
        type: "custom",
        message: "Ops cliente não encontrado!",
      });
      return;
    }

    setCustomer({
      id: json.id,
      name: json.name,
    });
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-2">
      <h1 className="font-bold text-3xl mt-24 text-center">Abrir chamado</h1>
      <main className="flex flex-col mt-4 mb-4">
        {customer ? (
          <div
            className="bg-slate-100 py-6 px-4 rounded flex items-center justify-between "
            key={customer.id}
          >
            <p className="text-lg">
              <strong>Cliente selecionado: </strong>
              {customer.name}
            </p>
            <button
              className="  h-11 px-2 flex items-center justify-center rounded"
              onClick={handleClearCustomer}
            >
              <FiX size={30} color="red" />
            </button>
          </div>
        ) : (
          <form
            className="bg-slate-100 py-6 px-2 rounded"
            onSubmit={handleSubmit(handleSearchCustomer)}
          >
            <div className=" flex flex-col gap-3">
              <Input
                name="email"
                placeholder="Digite o email do cliente..."
                type="text"
                error={errors.email?.message}
                register={register}
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-3 px-2 h-11 bg-blue-500 rounded text-white font-bold"
              >
                Procurar Clientes
                <BsSearch size={24} color="white" />
              </button>
            </div>
          </form>
        )}
        {customer !== null && <FormTicket />}
      </main>
    </div>
  );
}
