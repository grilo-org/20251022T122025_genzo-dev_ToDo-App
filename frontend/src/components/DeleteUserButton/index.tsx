"use client";

import { useTransition } from "react";
import { Button } from "../Button";
import { XIcon } from "lucide-react";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";
import { deleteUserAction } from "@/actions/user/delete-user-action";

// type User = {
//   id: string;
// };

export function DeleteUserButton() {
  const [isDeleting, startTransition] = useTransition();

  const deleteUser = () => {
    toast.dismiss();

    startTransition(async () => {
      const result = await deleteUserAction();

      if (result?.errors) {
        toast.error(result.errors);
        return;
      }

      toast.success("Usuário deletado com sucesso!");
      redirect("/login");
    });
  };

  return (
    <Button
      variant="icon"
      sizes="icon"
      onClick={deleteUser}
      disabled={isDeleting}
      aria-label="Deletar tarefa?"
      title="Deletar tarefa?"
      className={`${isDeleting ? "animate-pulse" : ""}`}
    >
      <XIcon className="stroke-red-800 hover:scale-105" />
    </Button>
  );
}
