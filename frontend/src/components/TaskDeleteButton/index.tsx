"use client";

import { deleteTaskAction } from "@/actions/delete-task-action";
import { useTransition } from "react";
import { Button } from "../Button";
import { TrashIcon } from "lucide-react";
import { toast } from "react-toastify";

type TaskDeleteButtonProps = {
  id: string;
};

export function TaskDeleteButton({ id }: TaskDeleteButtonProps) {
  const [isDeleting, startTransition] = useTransition();

  const deleteTask = () => {
    toast.dismiss();

    startTransition(async () => {
      const result = await deleteTaskAction(id);

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Tarefa deletada com sucesso!");
    });
  };

  return (
    <Button
      variant="icon"
      sizes="icon"
      onClick={deleteTask}
      disabled={isDeleting}
      aria-label="Deletar tarefa?"
      title="Deletar tarefa?"
      className={`${isDeleting ? "animate-pulse" : ""}`}
    >
      <TrashIcon className="stroke-red-800 hover:scale-105" />
    </Button>
  );
}
