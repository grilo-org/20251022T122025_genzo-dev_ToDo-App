"use server";

import { getCurrentUser } from "@/libs/login/manage-login";
import { TaskModel } from "@/models/task/task-model";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { revalidateTag } from "next/cache";

export async function toogleTaskStatus(id: string) {
  const user = await getCurrentUser();

  if (!user) {
    return {
      error: "Você precisa estar logado para alternar o status da tarefa",
    };
  }

  const response = await authenticatedApiRequest<TaskModel>(
    `/task/me/${id}/done`,
    {
      method: "PATCH",
    }
  );

  if (!response.success) {
    return {
      errors: response.errors,
    };
  }

  revalidateTag("tasks");
}
