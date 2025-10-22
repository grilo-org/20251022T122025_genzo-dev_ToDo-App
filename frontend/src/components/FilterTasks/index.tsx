import clsx from "clsx";
import Link from "next/link";

type FilterTasksProps = {
  linkProps: React.ComponentProps<typeof Link>;
  labelFilter: string;
  isActive?: boolean;
};

export function FilterTasks({
  linkProps,
  labelFilter,
  isActive,
}: FilterTasksProps) {
  return (
    <div className="flex gap-2">
      <Link
        {...linkProps}
        className={clsx(
          "px-3 py-1 rounded transition hover:shadow-[0_1px_4px_rgba(0,0,0,0.4)]",
          isActive ? "bg-blue-600 text-white" : "bg-gray-200 text-black"
        )}
      >
        {labelFilter}
      </Link>
    </div>
  );
}
