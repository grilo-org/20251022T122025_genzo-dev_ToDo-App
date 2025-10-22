//TODO: Remover após terminar de consumir todos os dados da API REST (NestJS)

"use server";

import { hashPassword } from "@/libs/login/manage-login";
import {
  createUser,
  findUserByUsername,
} from "@/repositories/user/user-repository";
import { asyncDelay } from "@/utils/async-delay";
import { redirect } from "next/navigation";
import { v4 as uuidV4 } from "uuid";

type RegisterActionState = {
  username: string;
  password: string;
  confirmPassword: string;
  error?: string;
  success?: true;
};

export async function registerAction(
  state: RegisterActionState,
  formData: FormData
) {
  await asyncDelay(500);

  if (!(formData instanceof FormData)) {
    return {
      username: "",
      password: "",
      confirmPassword: "",
      error: "Dados inválidos",
    };
  }

  const username = formData.get("username")?.toString().trim() || "";
  const password = formData.get("password")?.toString().trim() || "";
  const confirmPassword =
    formData.get("confirmPassword")?.toString().trim() || "";

  if (!username || !password || !confirmPassword) {
    return {
      username,
      password,
      confirmPassword,
      error: "Preencha todos os campos",
    };
  }

  if (password !== confirmPassword) {
    return {
      username,
      password,
      confirmPassword,
      error: "As senhas não conferem",
    };
  }

  const existingUser = await findUserByUsername(username);
  if (existingUser) {
    return {
      username,
      password,
      confirmPassword,
      error: "Esse usuário já existe",
    };
  }

  const passwordHash = await hashPassword(password);

  await createUser({
    id: uuidV4(),
    name: username,
    createdAt: new Date().toISOString(),
    passwordHash,
  });

  redirect("/login");
}
