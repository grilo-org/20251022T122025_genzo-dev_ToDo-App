"use server";

import { CreateTask, makePartialTask } from "@/dto/task/dto";
import { getCurrentUser } from "@/libs/login/manage-login";
import { TaskUpdateSchema } from "@/libs/task/validation";
import { TaskModel } from "@/models/task/task-model";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

type UpdateTaskActionState = {
  formState: CreateTask;
  errors: string[];
  success?: true;
};

export async function updateTaskAction(
  prevState: UpdateTaskActionState,
  formData: FormData
): Promise<UpdateTaskActionState> {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return {
      formState: prevState.formState,
      errors: ["Você precisa estar logado para atualizar a tarefa"],
    };
  }

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ["Dados inválidos"],
    };
  }

  const id = formData.get("id")?.toString() || "";

  if (!id || typeof id !== "string") {
    return {
      formState: prevState.formState,
      errors: ["ID inválido"],
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries());
  const zodParsedObj = TaskUpdateSchema.safeParse(formDataToObj);

  if (!zodParsedObj.success) {
    const errors = getZodErrorMessages(zodParsedObj.error.format());
    return {
      errors,
      formState: makePartialTask(formDataToObj),
    };
  }

  const validTaskData = zodParsedObj.data;

  const response = await authenticatedApiRequest<TaskModel>(`/task/me/${id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(validTaskData),
  });

  if (!response.success) {
    return {
      formState: makePartialTask(validTaskData),
      errors: response.errors,
    };
  }

  revalidateTag("tasks");

  redirect("/tasks/all");
}
