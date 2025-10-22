import ManageTaskForm from "@/components/ManageTaskForm";
import { findTaskById } from "@/libs/task/queries";
import { notFound } from "next/navigation";

type UpdateTaskPageProps = {
  params: { id: string };
};

export default async function UpdateTaskPage({ params }: UpdateTaskPageProps) {
  const { id } = await params;
  const task = await findTaskById(id);

  if (!task) notFound();

  return (
    <div className="py-6">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold">
        Atualizar tarefa
      </h2>

      <ManageTaskForm mode="update" task={task} />
    </div>
  );
}
