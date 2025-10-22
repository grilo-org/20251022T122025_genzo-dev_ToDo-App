"use client";

import { ReactNode, useTransition } from "react";
import { FilterTasks } from "@/components/FilterTasks";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { HourglassIcon, LogOutIcon, PlusIcon } from "lucide-react";
import { logoutAction } from "@/actions/login/logout-action";

type TasksLayoutProps = {
  children: ReactNode;
};

export default function TasksLayout({ children }: TasksLayoutProps) {
  const pathname = usePathname();
  const activeFilter = pathname?.split("/")[2] || "all";
  const [isPending, startTransition] = useTransition();

  const filters = [
    { label: "Todas", path: "all" },
    { label: "Pendentes", path: "pending" },
    { label: "Concluídas", path: "done" },
  ];

  function handleLogout(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();

    startTransition(async () => {
      await logoutAction();
    });
  }

  return (
    //TODO:Utilizar CLSX
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div className="flex justify-center sm:justify-start gap-2 my-4">
          {filters.map(({ label, path }) => (
            <FilterTasks
              key={path}
              linkProps={{ href: `/tasks/${path}` }}
              labelFilter={label}
              isActive={activeFilter === path}
            />
          ))}
        </div>

        <div className="flex gap-4">
          <Link
            href="/new"
            className="flex items-center gap-2 mb-2 sm:my-4 border-1 px-3 py-1 rounded bg-gray-200 hover:brightness-90 transition"
          >
            <PlusIcon className="w-4 h-4" />
            Adicionar tarefa
          </Link>
          <a
            onClick={handleLogout}
            href="#"
            className="flex items-center gap-2 mb-2 sm:my-4 border-1 px-3 py-1 rounded bg-red-500 hover:brightness-90 transition"
          >
            {isPending && (
              <>
                <HourglassIcon className="w-4 h-4" />
                Aguarde...
              </>
            )}
            {!isPending && (
              <>
                <LogOutIcon className="w-4 h-4" />
                Sair
              </>
            )}
          </a>
        </div>
      </div>

      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  );
}
