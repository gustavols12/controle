"use client";
import { Input } from "@/components/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CustomerDataInfo } from "../../page";
import { useRouter } from "next/navigation";

interface TicketFormProps {
  customer: CustomerDataInfo;
}

export function FormTicket({ customer }: TicketFormProps) {
  const schema = z.object({
    name: z.string().min(1, "O nome do chamado é obrigatório"),
    description: z.string().min(1, "Descreva um pouco obre o problema"),
  });

  type FormData = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function handleRegisterTicket(data: FormData) {
    const response = await fetch("/api/ticket", {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        description: data.description,
        customerId: customer.id,
      }),
    });
    if (response.ok) {
      setValue("name", "");
      setValue("description", "");
    }
  }
  return (
    <form
      className="bg-slate-100 mt-6 px-4 py-6 rounded "
      onSubmit={handleSubmit(handleRegisterTicket)}
    >
      <label className="font-medium text-lg mb-1">Nome do chamado</label>
      <Input
        name="name"
        placeholder="digite o nome do chamado"
        register={register}
        type="text"
        error={errors?.name?.message}
      />
      <label className="font-medium text-lg mb-1">Descreva o problema</label>
      <textarea
        id="description"
        className="w-full h-24 rounded-md resize-none mb-2 px-2 border-2 border-slate-100 bg-white"
        placeholder="Descreva o seu problema..."
        {...register("description")}
      ></textarea>
      {errors.description?.message && (
        <p className="text-red-500 my-1">{errors.description.message}</p>
      )}
      <button className="w-full bg-blue-500 rounded h-11 px-2 text-white font-bold">
        Cadastrar
      </button>
    </form>
  );
}
