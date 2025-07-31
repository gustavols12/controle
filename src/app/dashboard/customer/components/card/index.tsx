import { CustomerProps } from "@/utils/customer.type";

export function Cardcustomer({ customer }: { customer: CustomerProps }) {
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
      <button className="bg-red-500 px-4 rounded-lg text-white mt-2 self-start">
        {" "}
        Deletar
      </button>
    </article>
  );
}
