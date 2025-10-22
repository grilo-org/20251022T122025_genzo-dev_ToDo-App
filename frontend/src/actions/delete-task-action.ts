"use server";

import { getCurrentUser } from "@/libs/login/manage-login";
import { TaskModel } from "@/models/task/task-model";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { revalidateTag } from "next/cache";

export async function deleteTaskAction(id: string) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return {
      error: "Você precisa estar logado para deletar uma tarefa",
    };
  }

  if (!id || typeof id !== "string") {
    return {
      error: "Dados inválidos",
    };
  }

  const response = await authenticatedApiRequest<TaskModel>(`/task/me/${id}`, {
    method: "DELETE",
  });

  if (!response.success) {
    return {
      errors: response.errors,
    };
  }

  revalidateTag("tasks");

  return {
    error: "",
  };
}
