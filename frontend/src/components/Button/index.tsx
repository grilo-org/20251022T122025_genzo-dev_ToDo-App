import clsx from "clsx";

type ButtonVariants = "default" | "link" | "danger" | "icon";
type ButtonSizes = "sm" | "md" | "lg" | "icon";

type ButtonProps = {
  variant?: ButtonVariants;
  sizes?: ButtonSizes;
} & React.ComponentProps<"button">;

export function Button({
  variant = "default",
  sizes = "md",
  ...props
}: ButtonProps) {
  const buttonVariants: Record<ButtonVariants, string> = {
    default: clsx("bg-blue-600 hover:bg-blue-700 text-white"),
    link: clsx("bg-gray-200 hover:bg-gray-300"),
    danger: clsx("bg-red-600 hover:bg-red-700"),
    icon: clsx(""),
  };

  const buttonSizes: Record<ButtonSizes, string> = {
    sm: clsx(
      "text-xs/tight py-1 px-2 rounded-sm",
      "[&_svg]:w-3 [&_svg]:h-3 gap-1"
    ),
    md: clsx(
      "text-base/tight py-2 px-4 rounded-md",
      "[&_svg]:w-5 [&_svg]:h-5 gap-2"
    ),
    lg: clsx(
      "text-lg/tight py-4 px-8 rounded-lg",
      "[&_svg]:w-6 [&_svg]:h-6 gap-3"
    ),
    icon: "",
  };

  const buttonClasses = clsx(
    buttonVariants[variant],
    buttonSizes[sizes],
    "flex items-center justify-center cursor-pointer transition",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    props.className
  );

  return <button {...props} className={buttonClasses}></button>;
}
