"use server";

import { createLoginSessionFromApi } from "@/libs/login/manage-login";
import { LoginSchema } from "@/libs/login/schema";
import { apiRequest } from "@/utils/api-request";
import { asyncDelay } from "@/utils/async-delay";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";
import { redirect } from "next/navigation";

type LoginActionState = {
  name: string;
  errors: string[];
};

export async function loginAction(state: LoginActionState, formData: FormData) {
  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN));

  if (!allowLogin) {
    return {
      name: "",
      errors: ["Login not allowed"],
    };
  }

  await asyncDelay(1000); // pensar se diminuo ou removo

  if (!(formData instanceof FormData)) {
    return {
      name: "",
      errors: ["Dados inválidos"],
    };
  }

  const formObj = Object.fromEntries(formData.entries());
  const formUser = formObj?.name?.toString() || "";
  const parsedFormData = LoginSchema.safeParse(formObj);

  if (!parsedFormData.success) {
    return {
      name: formUser,
      errors: getZodErrorMessages(parsedFormData.error.format()),
    };
  }

  const loginResponse = await apiRequest<{ accessToken: string }>(
    "/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsedFormData.data),
    }
  );

  if (!loginResponse.success) {
    return {
      name: formUser,
      errors: loginResponse.errors,
    };
  }

  // await createLoginSession({ id: user.id, username: user.name });
  //TODO: Criar essa função na manage-login.ts
  await createLoginSessionFromApi(loginResponse.data.accessToken);
  redirect("/tasks/all");
}
