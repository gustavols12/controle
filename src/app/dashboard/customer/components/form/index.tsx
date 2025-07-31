"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/input";

export function NewCustomerForm() {
  const schema = z.object({
    name: z.string().min(1, "o nome é obrigatório"),
    email: z.email("Digite um email válido").min(1, "o email é obrigatório"),
    phone: z.string().refine(
      (value) => {
        return /^(?:\(\d{2}\)\s?)?\d{11}$/.test(value);
      },
      {
        message: "o numero de telefone deve estar no formato (41)995566353",
      }
    ),
    address: z.string(),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function handleRegisterCustomer(data: FormData) {}

  return (
    <form
      className="flex flex-col mt-6 "
      onSubmit={handleSubmit(handleRegisterCustomer)}
    >
      <label htmlFor="name" className="mb-1 text-lg font-medium">
        Nome completo
      </label>
      <Input
        name="name"
        type="text"
        placeholder="digite seu nome"
        register={register}
        error={errors.name?.message}
      />
      <section className="flex flex-col sm:flex-row gap-2 my-2">
        <div className="flex-1">
          <label htmlFor="email" className="mb-1 text-lg font-medium">
            Email
          </label>
          <Input
            name="email"
            type="email"
            placeholder="digite seu email"
            register={register}
            error={errors.email?.message}
          />
        </div>
        <div className="flex-1">
          <label htmlFor="phone" className="mb-1 text-lg font-medium">
            Telefone
          </label>
          <Input
            name="phone"
            type="text"
            placeholder="exemplo 41 995566353"
            register={register}
            error={errors.phone?.message}
          />
        </div>
      </section>
      <label htmlFor="name" className="mb-1 text-lg font-medium">
        Endereço completo
      </label>
      <Input
        name="address"
        type="text"
        placeholder="digite seu endereço"
        register={register}
        error={errors.address?.message}
      />
      <button className="bg-blue-500 my-4 px-2 h-11 rounded text-white font-bold">
        Cadastrar
      </button>
    </form>
  );
}
