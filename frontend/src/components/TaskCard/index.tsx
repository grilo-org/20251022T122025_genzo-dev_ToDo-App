import { TaskModel } from "@/models/task/task-model";
import { PriorityBadge } from "../PriorityBadge";
import { StatusIcon } from "../StatusIcon";
import { PencilIcon } from "lucide-react";
import { formatDateTime, formatDistaceToNow } from "@/utils/format-datetime";
import { TaskDeleteButton } from "../TaskDeleteButton";
import Link from "next/link";
// import { TaskUpdateButton } from "../TaskUpdateButton";

type TaskCardProps = {
  task: TaskModel;
};

export function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="mt-2 w-70 rounded shadow-[0_1px_4px_rgba(0,0,0,0.6)] hover:scale-102 transition">
      <div className="flex justify-between py-2 items-center px-4 border-b-2">
        <h2 className=" w-50 truncate text-xl" title={task.title}>
          {task.title}
        </h2>

        <PriorityBadge priority={task.priority} />
      </div>

      <p className="px-4">{task.content}</p>

      <div className="flex items-center justify-between pt-1 pb-1 px-4 rounded-b bg-gray-300">
        <div className="py-2">
          <div>
            <time
              className="text-sm border-1 px-1 rounded"
              title={formatDistaceToNow(task.createdAt)}
            >
              {formatDateTime(task.createdAt)}
            </time>
          </div>
        </div>

        <div className="flex gap-4">
          {/* TODO: Criar função de alterar task (PencilIcon) */}
          {/* <TaskUpdateButton /> */}
          <Link href={`/task/${task.id}`}>
            <PencilIcon className="stroke-blue-800 hover:scale-105 transition cursor-pointer" />
          </Link>
          <TaskDeleteButton id={task.id} />
          {/* TODO: Alterar o nome StatusIcon para algo como TaskStatusIcon */}
          <StatusIcon done={task.done} taskId={task.id} />
        </div>
      </div>
    </div>
  );
}
