import clsx from "clsx";

type PriorityBadgeProps = {
  priority: string;
};

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  return (
    <label
      className={clsx(" rounded w-20 text-center", {
        "bg-red-300 border-2 border-red-400 text-sm": priority === "Urgente",
        "bg-yellow-300 border-2 border-yellow-400 text-sm":
          priority === "Normal",
        "bg-blue-300 border-2 border-blue-400 text-sm": priority === "Eventual",
      })}
    >
      {priority}
    </label>
  );
}
