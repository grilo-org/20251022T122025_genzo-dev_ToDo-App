import clsx from "clsx";
import { useId } from "react";

type InputTextAreaProps = {
  labelText?: string;
} & React.ComponentProps<"textarea">;

export function InputTextArea({ labelText, ...props }: InputTextAreaProps) {
  const id = useId();

  return (
    <div className="flex flex-col gap-2">
      {labelText && (
        <label className={clsx("text-2sm sm:text-lg")} htmlFor={id}>
          {labelText}
        </label>
      )}

      <textarea
        {...props}
        className={clsx(
          "bg-white outline-0 text-base/tight",
          "ring-2 ring-slate-400 rounded",
          "p-2 transition focus:ring-blue-600",
          "min-h-40 ",
          "disabled:bg-slate-200 disabled:text-slate-400 disabled:placeholder-slate-400",
          "read-only:bg-slate-100",
          props.className
        )}
        id={id}
      ></textarea>
    </div>
  );
}
