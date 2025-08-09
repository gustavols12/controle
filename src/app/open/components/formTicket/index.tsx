"use client";
import { Input } from "@/components/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function FormTicket() {
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
  return (
    <form className="bg-slate-100 mt-6 px-4 py-6 rounded ">
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
