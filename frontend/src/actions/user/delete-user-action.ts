"use server";

import { getCurrentUser } from "@/libs/login/manage-login";
import { PublicUserDto } from "@/libs/user/schema";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";

export async function deleteUserAction() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return {
      errors: "Você precisa estar logado para deletar este usuário",
    };
  }

  const response = await authenticatedApiRequest<PublicUserDto>(`/user/me`, {
    method: "DELETE",
  });

  if (!response.success) {
    return {
      errors: response.errors,
    };
  }

  return {
    errors: "",
  };
}
