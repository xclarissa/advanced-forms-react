import { z } from "zod";

export const FormSchema = z
  .object({
    password: z.string().min(6, "Senha deve possuir ao menos 6 caracteres"),
    confirmPassword: z.string(),
    quantity: z.coerce
      .number({
        errorMap: () => {
          return {
            message: "Informe um número válido",
          };
        },
      })
      .positive("Número deve ser maior que 0"),
    url: z.string().url("Informe uma url válida"),
    agree: z.boolean(),
    select: z.string(),
    role: z.enum(["admin", "user"], {
      errorMap: () => {
        return {
          message: "Apenas as permissões 'admin' e 'user' são aceitas",
        };
      },
    }),
  })
  .refine((field) => field.password === field.confirmPassword, {
    message: "As senhas não conferem",
    path: ["confirmPassword"],
  })
  .refine((field) => field.agree === true, {
    message: "Aceite os termos",
    path: ["agree"],
  })
  .refine((field) => field.select.length, {
    message: "Selecione ao menos uma opção",
    path: ["select"],
  });

export type FormData = z.infer<typeof FormSchema>;
