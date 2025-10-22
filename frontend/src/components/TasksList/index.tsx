import { TaskModel } from "@/models/task/task-model";
import { TaskCard } from "../TaskCard";

type TasksListProps = {
  tasks: TaskModel[];
};

export async function TasksList({ tasks }: TasksListProps) {
  return (
    <ul className="list-none flex flex-wrap justify-center gap-8 ">
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskCard task={task} />
        </li>
      ))}
    </ul>
  );
}
