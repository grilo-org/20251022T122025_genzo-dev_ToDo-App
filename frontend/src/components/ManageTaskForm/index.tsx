"use client";

import { EditIcon, PlusIcon } from "lucide-react";
import { Button } from "../Button";
import InputDropdown from "../InputDropdown";
import { InputText } from "../InputText";
import { InputTextArea } from "../InputTextArea";
import { useActionState, useEffect, useState } from "react";
import { Priority } from "@/models/task/task-model";
import { makePartialTask } from "@/dto/task/dto";
import { createTaskAction } from "@/actions/create-task-action";
import { updateTaskAction } from "@/actions/update-task-action";
import { toast } from "react-toastify";

type Task = {
  id: string;
  title: string;
  content: string;
  priority: Priority;
};

type ManageTaskFormUpdateProps = {
  mode: "update";
  task: Task;
};

type ManageTaskFormCreateProps = {
  mode: "create";
};

type ManageTaskFormProps =
  | ManageTaskFormCreateProps
  | ManageTaskFormUpdateProps;

export default function ManageTaskForm(props: ManageTaskFormProps) {
  const { mode } = props;

  const task = mode === "update" ? props.task : undefined;

  const actionsMap = {
    update: updateTaskAction,
    create: createTaskAction,
  };

  const initialState = {
    formState: makePartialTask(task),
    errors: [],
  };

  const [state, action, isPending] = useActionState(
    actionsMap[mode],
    initialState
  );

  useEffect(() => {
    if (state.errors.length > 0) {
      toast.dismiss();
      state.errors.forEach((error) => toast.error(error));
    }
  }, [state.errors]);

  useEffect(() => {
    if (state.success) {
      toast.dismiss();
      toast.success(
        mode === "update"
          ? "Tarefa atualizada com sucesso!"
          : "Tarefa criada com sucesso!"
      );
    }
  }, [state.success, mode]);

  const { formState } = state;
  const [priority, setPriority] = useState(task?.priority ?? "Normal");

  return (
    <form action={action} className="flex flex-col gap-4 py-4 p-1 sm:px-8">
      {mode === "update" && (
        <input type="hidden" name="id" value={formState.id} />
      )}

      <InputText
        labelText="Título:"
        name="title"
        placeholder="Digite o título da tarefa"
        disabled={isPending}
        defaultValue={formState.title}
      />

      <InputTextArea
        labelText="Conteúdo:"
        name="content"
        placeholder="Digite o conteúdo da tarefa"
        disabled={isPending}
        defaultValue={formState.content}
      />

      <InputDropdown
        labelText="Nível"
        name="priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
        disabled={isPending}
        className="w-48 hover:cursor-pointer"
      >
        <option value="Eventual">Eventual</option>
        <option value="Normal">Normal</option>
        <option value="Urgente">Urgente</option>
      </InputDropdown>

      <Button
        type="submit"
        variant="default"
        sizes="md"
        className="mt-4 w-fit"
        disabled={isPending}
      >
        {mode === "update" ? (
          <>
            <EditIcon /> Atualizar tarefa
          </>
        ) : (
          <>
            <PlusIcon /> Criar tarefa
          </>
        )}
      </Button>
    </form>
  );
}
