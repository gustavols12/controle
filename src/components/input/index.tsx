"use client";
import { UseFormRegister, RegisterOptions } from "react-hook-form";

interface InputProps {
  type: string;
  placeholder: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
  rules?: RegisterOptions;
}

export function Input({
  name,
  placeholder,
  register,
  type,
  error,
  rules,
}: InputProps) {
  return (
    <>
      <input
        type={type}
        id={name}
        className="w-full border-2 rounded-md h-11 px-2"
        placeholder={placeholder}
        {...register(name, rules)}
      />
      {error && <p className="text-red-500 my-1">{error}</p>}
    </>
  );
}
