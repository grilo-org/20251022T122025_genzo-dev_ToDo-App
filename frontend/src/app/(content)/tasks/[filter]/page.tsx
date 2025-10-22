import { TasksList } from "@/components/TasksList";
import {
  findAllTasksCached,
  findTasksDone,
  findTasksPending,
} from "@/libs/task/queries";
import { TaskModel } from "@/models/task/task-model";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type TaskFilterFn = () => Promise<TaskModel[]>;

const emptyMessages: Record<string, string> = {
  done: "Você ainda não concluiu nenhuma tarefa.",
  pending: "Você não tem tarefas pendentes.",
  all: "Você ainda não possui nenhuma tarefa.",
};

const filterFunctions: Record<string, TaskFilterFn> = {
  done: findTasksDone,
  pending: findTasksPending,
  all: findAllTasksCached,
};

export async function generateStaticParams() {
  return [{ filter: "all" }, { filter: "done" }, { filter: "pending" }];
}

export default async function TasksPage({
  params,
}: {
  params: Promise<{ filter: "all" | "done" | "pending" }>;
}) {
  const { filter } = await params;
  const fetchTasks = filterFunctions[filter];

  if (!fetchTasks) {
    notFound();
  }

  const tasks = await fetchTasks();

  if (!tasks || tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 space-y-4">
        <p className="text-center text-base sm:text-lg font-bold">
          {emptyMessages[filter] || "Nenhuma tarefa encontrada"}
        </p>
        {filter === "all" && (
          <Link
            href="/new"
            className="flex gap-2 items-center justify-center px-4 p-2 text-white bg-blue-600 rounded hover:bg-blue-700 font-bold transition"
          >
            <PlusIcon size={20} /> Criar nova tarefa
          </Link>
        )}
      </div>
    );
  }

  return <TasksList tasks={tasks} />;
}
