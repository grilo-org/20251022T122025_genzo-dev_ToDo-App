"use server";

import { CreateTask, makePartialTask } from "@/dto/task/dto";
import { getCurrentUser } from "@/libs/login/manage-login";
import { TaskCreateSchema } from "@/libs/task/validation";
import { TaskModel } from "@/models/task/task-model";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { getZodErrorMessages } from "@/utils/get-zod-error-messages";
import { logColor } from "@/utils/log-color";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

type CreateTaskActionState = {
  formState: CreateTask;
  errors: string[];
  success?: true;
};

export async function createTaskAction(
  prevState: CreateTaskActionState,
  formData: FormData
): Promise<CreateTaskActionState> {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return {
      formState: prevState.formState,
      errors: ["Você precisa estar logado para criar uma tarefa"],
    };
  }

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ["Dados inválidos"],
    };
  }

  logColor("CREATE");

  const formDataToObj = Object.fromEntries(formData.entries());
  const zodParsedObj = TaskCreateSchema.safeParse(formDataToObj);

  if (!zodParsedObj.success) {
    const errors = getZodErrorMessages(zodParsedObj.error.format());
    return {
      errors,
      formState: makePartialTask(formDataToObj),
    };
  }

  const validTaskData = zodParsedObj.data;

  const response = await authenticatedApiRequest<TaskModel>("/task/me", {
    method: "POST",
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
  redirect("/tasks/pending?created=1");
}
