"use server";

import { getCurrentUser } from "@/libs/login/manage-login";
import { UpdatePasswordDto, UpdatePasswordSchema } from "@/libs/user/schema";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";

type UpdatePasswordActionState = {
  formState: UpdatePasswordDto;
  errors: string[];
  success?: boolean;
};

export async function updatePasswordAction(
  prevState: UpdatePasswordActionState,
  formData: FormData
): Promise<UpdatePasswordActionState> {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return {
      formState: prevState.formState,
      errors: ["Usuário não autenticado"],
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries());
  const zodParsedObj = UpdatePasswordSchema.safeParse(formDataToObj);

  if (!zodParsedObj.success) {
    const errors = getZodErrorMessages(zodParsedObj.error.format());
    return {
      errors,
      formState: formDataToObj as UpdatePasswordDto,
    };
  }

  const validePasswordData = zodParsedObj.data;

  const response = await authenticatedApiRequest<UpdatePasswordDto>(
    "/user/me/password",
    {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(validePasswordData),
    }
  );

  if (!response.success) {
    return {
      formState: validePasswordData,
      errors: response.errors,
    };
  }

  return {
    formState: {
      currentPassword: "",
      newPassword: "",
    },
    errors: [],
    success: true,
  };
}
