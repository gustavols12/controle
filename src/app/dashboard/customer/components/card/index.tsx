"use client";
import { CustomerProps } from "@/utils/customer.type";
import { useRouter } from "next/navigation";

export function Cardcustomer({ customer }: { customer: CustomerProps }) {
  const router = useRouter();
  async function handleDeleteCustomer() {
    try {
      const res = await fetch(`/api/customer/${customer.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      alert(error);
    }
  }
  return (
    <article className="flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2 hover:scale-105 duration-300">
      <h2>
        <strong>Nome: </strong>
        {customer.name}
      </h2>
      <p>
        <strong>email:</strong> {customer.email}
      </p>
      <p>
        <strong>telefone:</strong> {customer.phone}
      </p>
      <button
        className="bg-red-500 px-4 rounded-lg text-white mt-2 self-start"
        onClick={handleDeleteCustomer}
      >
        {" "}
        Deletar
      </button>
    </article>
  );
}
