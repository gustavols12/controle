"use client";
import { CustomerProps } from "@/utils/customer.type";
import { TicketProps } from "@/utils/ticket.type";
import { useRouter } from "next/navigation";
import { FiCheckSquare, FiFile, FiTrash } from "react-icons/fi";

interface TicketItemProps {
  ticket: TicketProps;
  customer: CustomerProps | null;
}
export function TicketItem({ ticket, customer }: TicketItemProps) {
  const router = useRouter();
  async function handleChangeStatus() {
    try {
      const response = await fetch("/api/ticket", {
        method: "PATCH",

        body: JSON.stringify({ id: ticket.id }),
      });
      router.refresh();
    } catch (error) {
      alert("deu erro");
    }
  }
  return (
    <>
      <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0">
        <td className="text-left pl-2">{customer?.name}</td>
        <td className="text-left">
          {ticket.createdAt?.toLocaleDateString("pt-br")}
        </td>
        <td className="text-left">
          <span className="bg-green-500 rounded px-2 py-1">
            {ticket.status}
          </span>
        </td>
        <td className="text-left">
          <button className="mr-1" onClick={handleChangeStatus}>
            <FiCheckSquare size={24} color="green" />
          </button>
          <button>
            <FiFile size={24} color="#3b82f6" />
          </button>
        </td>
      </tr>
    </>
  );
}
