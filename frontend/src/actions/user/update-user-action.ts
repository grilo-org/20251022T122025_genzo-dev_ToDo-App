"use server";

import { getCurrentUser } from "@/libs/login/manage-login";
import { UpdateUserDto, UpdateUserSchema } from "@/libs/user/schema";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";

type UpdateUserActionState = {
  formState: UpdateUserDto;
  errors: string[];
  success?: true;
};

export async function updateUserAction(
  prevState: UpdateUserActionState,
  formData: FormData
): Promise<UpdateUserActionState> {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return {
      formState: prevState.formState,
      errors: ["Usuário não autenticado"],
    };
  }

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ["Dados inválidos"],
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries());
  const zodParsedObj = UpdateUserSchema.safeParse(formDataToObj);

  if (!zodParsedObj.success) {
    const errors = getZodErrorMessages(zodParsedObj.error.format());
    return {
      errors,
      formState: formDataToObj as UpdateUserDto,
    };
  }

  const validUserData = zodParsedObj.data;

  const response = await authenticatedApiRequest<UpdateUserDto>("/user/me", {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(validUserData),
  });

  if (!response.success) {
    return {
      formState: validUserData,
      errors: response.errors,
    };
  }

  return {
    formState: response.data,
    errors: [],
    success: true,
  };
}
