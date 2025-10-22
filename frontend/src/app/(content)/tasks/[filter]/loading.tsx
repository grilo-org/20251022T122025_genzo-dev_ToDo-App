import { SpinLoader } from "@/components/SpinLoader";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-1">
      <SpinLoader />;
      <span className="text-gray-500 text-xl">Carregando tarefas...</span>
    </div>
  );
}
