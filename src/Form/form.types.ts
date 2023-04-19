import { z } from "zod";

export const CreateUserFormSchema = z
  .object({
    avatar: z
      .instanceof(FileList)
      .transform((list) => list.item(0)!)
      .refine(
        (file) => file!.size <= 5 * 1024 * 1024,
        "Arquivo precisa ter no máximo 5mb"
      ),
    name: z
      .string()
      .nonempty("O nome é obrigatório")
      .transform((name) => {
        return name
          .trim()
          .split(" ")
          .map((word) => {
            return word[0].toLocaleUpperCase().concat(word.substring(1));
          })
          .join(" ");
      }),
    email: z
      .string()
      .nonempty("O email é obrigatório")
      .email("Formato de email inválido")
      .refine(
        (email) => email.endsWith("rocketseat.com.br"),
        "O email precisa ser da rocketseat"
      ),
    password: z
      .string()
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
        "Senha deve possuir no mínimo um caractere maiúsculo e 8 caracteres"
      ),
    confirmPassword: z
      .string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/),
    techs: z
      .array(
        z.object({
          title: z.string().nonempty("O título é obrigatório"),
          knowledge: z.coerce.number().min(1).max(100),
        })
      )
      .min(2, "Insira pelo menos duas tecnologias"),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: "Senhas precisam ser compatíveis",
      });
      return z.NEVER;
    }
  });

export type FormValidatorCredentials = z.infer<typeof CreateUserFormSchema>;
