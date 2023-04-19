import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateUserFormSchema, FormValidatorCredentials } from "./form.types";
import { supabase } from "../lib/supabase";

export const Form = () => {
  const [output, setOutput] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormValidatorCredentials>({
    resolver: zodResolver(CreateUserFormSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "techs",
  });

  function addNewTech() {
    append({ title: "", knowledge: 0 });
  }

  async function createUser(data: FormValidatorCredentials) {
    await supabase.storage
      .from("advanced-forms-react")
      .upload(data.avatar.name, data.avatar);
    setOutput(JSON.stringify(data, null, 2));
  }

  return (
    <form
      className="flex flex-col gap-4 w-full max-w-sm"
      onSubmit={handleSubmit(createUser)}
    >
      <div className="flex flex-col gap-1">
        <label>Avatar</label>
        <input
          {...register("avatar")}
          type="file"
          accept="image/*" 
        />
        {errors && (
          <span className="text-red-500 text-sm">{errors.avatar?.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label>Nome</label>
        <input
          {...register("name")}
          type="text"
          className="border border-zinc-200 shadow-sm rounded h-10 bg-zinc-900 p-4"
        />
        {errors && (
          <span className="text-red-500 text-sm">{errors.name?.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label>Email</label>
        <input
          {...register("email")}
          type="email"
          className="border border-zinc-200 shadow-sm rounded h-10 bg-zinc-900 p-4"
        />
        {errors && (
          <span className="text-red-500 text-sm">{errors.email?.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label>Senha</label>
        <input
          {...register("password")}
          type="password"
          className="border border-zinc-200 shadow-sm rounded h-10 bg-zinc-900 p-4"
        />
        {errors && (
          <span className="text-red-500 text-sm">
            {errors.password?.message}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label>Confirmar senha</label>
        <input
          {...register("confirmPassword")}
          type="password"
          className="border border-zinc-200 shadow-sm rounded h-10 bg-zinc-900 p-4"
        />
        {errors && (
          <span className="text-red-500 text-sm">
            {errors.confirmPassword?.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="flex items-center justify-between">
          Tecnologias
          <button onClick={addNewTech} className="text-emerald-500 text-xs">
            Adicionar
          </button>
        </label>

        {fields.map((field, index) => {
          return (
            <div key={field.id} className="flex gap-2">
              <div className="flex flex-1 flex-col gap-1">
                <input
                  type="text"
                  {...register(`techs.${index}.title`)}
                  className="border border-zinc-200 shadow-sm rounded h-10 bg-zinc-900 p-4"
                />
                {errors && (
                  <span className="text-red-500 text-sm">
                    {errors.techs?.[index]?.title?.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <input
                  type="number"
                  {...register(`techs.${index}.knowledge`)}
                  className="w-16 border border-zinc-200 shadow-sm rounded h-10 bg-zinc-900 p-2"
                />
                {errors && (
                  <span className="text-red-500 text-sm">
                    {errors.techs?.[index]?.knowledge?.message}
                  </span>
                )}
              </div>
            </div>
          );
        })}
        {errors && (
          <span className="text-red-500 text-sm">{errors.techs?.message}</span>
        )}
      </div>

      <button
        type="submit"
        className="text-white bg-emerald-500 rounded font-semibold h-10 hover:bg-emerald-600"
      >
        Salvar
      </button>

      <pre>{output}</pre>
    </form>
  );
};
