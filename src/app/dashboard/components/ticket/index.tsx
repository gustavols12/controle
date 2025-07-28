import { FiFile, FiTrash } from "react-icons/fi";

export function TicketItem() {
  return (
    <>
      <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0">
        <td className="text-left pl-2">Mercado</td>
        <td className="text-left">27/12/2024</td>
        <td className="text-left">
          <span className="bg-green-500 rounded px-2 py-1">ABERTO</span>
        </td>
        <td className="text-left">
          <button className="mr-1">
            <FiTrash size={24} color="red" />
          </button>
          <button>
            <FiFile size={24} color="#3b82f6" />
          </button>
        </td>
      </tr>
    </>
  );
}
