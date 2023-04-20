import React from "react";
import { useForm } from "react-hook-form";
import { FormData, FormSchema } from "./CustomForm.types";
import { zodResolver } from "@hookform/resolvers/zod";

export const CustomForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  function submitData(data: FormData) {
    console.log(data);
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <h2 className="text-violet-600 text-center font-semibold text-xl">
        Advanced Forms
      </h2>
      <form
        className="flex flex-col gap-4 w-full max-w-sm"
        onSubmit={handleSubmit(submitData)}
      >
        <div className="flex flex-col gap-1">
          <label>Senha</label>
          <input
            {...register("password")}
            type="password"
            className="border border-zinc-200 shadow-sm rounded h-10 bg-zinc-900 p-4"
          />
          {errors && (
            <span className="text-red-500">{errors.password?.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label>Confirmação de senha</label>
          <input
            {...register("confirmPassword")}
            type="password"
            className="border border-zinc-200 shadow-sm rounded h-10 bg-zinc-900 p-4"
          />
          {errors && (
            <span className="text-red-500">
              {errors.confirmPassword?.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label>Quantidade</label>
          <input
            {...register("quantity")}
            type="number"
            className="border border-zinc-200 shadow-sm rounded h-10 bg-zinc-900 p-4"
          />
          {errors && (
            <span className="text-red-500">{errors.quantity?.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label>URL</label>
          <input
            {...register("url")}
            type="text"
            className="border border-zinc-200 shadow-sm rounded h-10 bg-zinc-900 p-4"
          />
          {errors && (
            <span className="text-red-500">{errors.url?.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label>Selecione</label>
          <select
            {...register("select")}
            className="border border-zinc-200 shadow-sm rounded h-10 bg-zinc-900 p-4"
          >
            <option>Opção 1</option>
            <option>Opção 2</option>
            <option>Opção 3</option>
          </select>
          {errors && (
            <span className="text-red-500">{errors.select?.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label>Permissão</label>
          <input
            {...register("role")}
            type="text"
            className="border border-zinc-200 shadow-sm rounded h-10 bg-zinc-900 p-4"
          />
          {errors && (
            <span className="text-red-500">{errors.role?.message}</span>
          )}
        </div>

        <div className="flex gap-2">
          <input {...register("agree")} type="checkbox" className="w-6 h-6" />
          <label>Concordo com os termos</label>
          {errors && (
            <span className="text-red-500">{errors.agree?.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="bg-violet-600 p-4 rounded hover:bg-violet-700"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};
