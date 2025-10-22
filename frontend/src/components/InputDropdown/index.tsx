import clsx from "clsx";
import { useId } from "react";

type InputDropdownProps = {
  labelText?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export default function InputDropdown({
  labelText,
  ...props
}: InputDropdownProps) {
  const id = useId();

  return (
    <div className={clsx("flex flex-col gap-2")}>
      {labelText && (
        <label className={clsx("text-2sm sm:text-lg")} htmlFor={id}>
          {labelText}
        </label>
      )}

      <select
        {...props}
        className={clsx(
          "bg-white outline-0 text-base/tight",
          "ring-2 ring-slate-400 rounded",
          "p-2 pr-8 transition focus:ring-blue-600",
          "disabled:bg-slate-200 disabled:text-slate-400 disabled:placeholder-slate-400",
          "read-only:bg-slate-100",
          props.className
        )}
        id={id}
      >
        {props.children}
      </select>
    </div>
  );
}
