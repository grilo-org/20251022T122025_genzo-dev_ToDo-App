import ManageTaskForm from "@/components/ManageTaskForm";

export default function NewTaskPage() {
  return (
    <div className="py-6">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold">
        Criar tarefa
      </h2>

      <ManageTaskForm mode="create" />
    </div>
  );
}
