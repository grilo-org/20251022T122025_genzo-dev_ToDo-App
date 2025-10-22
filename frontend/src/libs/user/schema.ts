import z from "zod";

const CreateUserBase = z.object({
  name: z.string().trim().min(1, "Nome precisa ter algum caractere"),
  password: z
    .string()
    .trim()
    .min(6, "Senha precisa ter no mínimo de 6 caracteres"),
  password2: z
    .string()
    .trim()
    .min(6, "Confirmação de senha precisa ter um mínimo de 6 caracteres"),
});

export const CreateUserSchema = CreateUserBase.refine(
  (data) => {
    return data.password === data.password2;
  },
  {
    path: ["password2"],
    message: "As senhas não conferem",
  }
).transform(({ name, password }) => {
  return {
    name,
    password,
  };
});

export const PublicUserSchema = z.object({
  id: z.string().default(""),
  name: z.string().default(""),
});

export const UpdatePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .trim()
      .min(6, "Senha precisa ter um mínimo de 6 caracteres"),
    newPassword: z
      .string()
      .trim()
      .min(6, "Nova senha precisa ter um mínimo de 6 caracteres"),
    newPassword2: z
      .string()
      .trim()
      .min(6, "Confirmação de senha precisa ter um mínimo de 6 caracteres"),
  })
  .refine(
    (data) => {
      return data.newPassword === data.newPassword2;
    },
    { path: ["newPassword2"], message: "As senhas não conferem" }
  )
  .transform(({ currentPassword, newPassword }) => {
    return {
      currentPassword,
      newPassword,
    };
  });

export const UpdateUserSchema = CreateUserBase.omit({
  password: true,
  password2: true,
}).extend({});

// export const UpdateUserSchema = CreateUserBase.extend({});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
export type PublicUserDto = z.infer<typeof PublicUserSchema>;
export type UpdatePasswordDto = z.infer<typeof UpdatePasswordSchema>;
