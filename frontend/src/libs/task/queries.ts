import { TaskModel } from "@/models/task/task-model";
import { authenticatedApiRequest } from "@/utils/authenticated-api-request";
import { cache } from "react";

export const findAllTasksCached = cache(async (): Promise<TaskModel[]> => {
  const res = await authenticatedApiRequest<TaskModel[]>("/task/me", {
    method: "GET",
    cache: "no-store",
  });

  if (!res.success) return [];
  return res.data;
});

export const findTasksPending = cache(async (): Promise<TaskModel[]> => {
  const res = await authenticatedApiRequest<TaskModel[]>("/task/me/pending", {
    method: "GET",
    cache: "no-store",
  });

  if (!res.success) return [];
  return res.data;
});

export const findTasksDone = cache(async (): Promise<TaskModel[]> => {
  const res = await authenticatedApiRequest<TaskModel[]>("/task/me/done", {
    method: "GET",
    cache: "no-store",
  });

  if (!res.success) return [];
  return res.data;
});

export const findTaskById = cache(
  async (id: string): Promise<TaskModel | null> => {
    const res = await authenticatedApiRequest<TaskModel>(`/task/me/${id}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.success) return null;
    return res.data;
  }
);
