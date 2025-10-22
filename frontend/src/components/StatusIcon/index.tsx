"use client";

import { toogleTaskStatus } from "@/actions/toogle-task-status";
import { BadgeCheckIcon } from "lucide-react";
import { useTransition } from "react";
import { toast } from "react-toastify";

type StatusIconProps = {
  taskId: string;
  done: boolean;
};

export function StatusIcon({ done, taskId }: StatusIconProps) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    toast.dismiss();

    startTransition(() => {
      toogleTaskStatus(taskId, done);

      if (done === true) {
        toast.warning("Status alterado para pendente!");
      } else {
        toast.success("Status alterado para concluída!");
      }
    });
  };

  return (
    // TODO: Alterar classe button do HTML para meu componente Button
    <button
      onClick={handleClick}
      disabled={isPending}
      title={done ? "Marcar como pendente" : "Marcar como concluída"}
      className={`cursor-pointer hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      <BadgeCheckIcon
        className={`${done ? "fill-green-500" : ""}  ${
          isPending ? "animate-pulse" : ""
        }`}
      />
    </button>

    // <p>
    //   {done ? (
    //     <BadgeCheckIcon className="fill-green-500 cursor-pointer hover:scale-105 transition" />
    //   ) : (
    //     <BadgeCheckIcon className="cursor-pointer hover:scale-105 transition" />
    //   )}
    // </p>
  );
}
