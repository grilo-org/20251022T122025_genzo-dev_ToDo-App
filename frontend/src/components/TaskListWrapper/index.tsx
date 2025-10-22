import {
  findAllTasksCached,
  findTasksDone,
  findTasksPending,
} from "@/libs/task/queries";
import { TaskModel } from "@/models/task/task-model";
import { TasksList } from "../TasksList";

type TaskListWrapperProps = {
  filter: "all" | "done" | "pending";
};

export default async function TaskListWrapper({
  filter,
}: TaskListWrapperProps) {
  let tasks: TaskModel[] = [];

  switch (filter) {
    case "done":
      tasks = await findTasksDone();
      break;
    case "pending":
      tasks = await findTasksPending();
      break;
    case "all":
      tasks = await findAllTasksCached();
      break;
  }

  return <TasksList tasks={tasks} />;
}
