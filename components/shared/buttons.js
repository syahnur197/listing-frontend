export function Button({
  children,
  className,
  buttonStyle = "default",
  ...rest
}) {
  const stylesArray = ["default", "primary", "secondary", "danger", "warning"];

  if (!stylesArray.includes(buttonStyle)) buttonStyle = "default";

  const buttonStyles = {
    default: "bg-gray-300 text-gray-800 hover:bg-gray-400 hover:text-gray-900",
    primary:
      "bg-primary-300 text-primary-800 hover:bg-primary-400 hover:text-primary-900",
    secondary:
      "bg-secondary-300 text-secondary-800 hover:bg-secondary-400 hover:text-secondary-900",
    danger: "bg-red-300 text-red-800 hover:bg-red-400 hover:text-red-900",
    warning:
      "bg-orange-300 text-orange-800 hover:bg-orange-400 hover:text-orange-900",
  };

  const classNames = `mt-8 mb-4 py-4 w-full text-2xl font-bold ${buttonStyles[buttonStyle]} transition duration-100 ease-out ${className}`;

  return (
    <button {...rest} className={classNames}>
      {children}
    </button>
  );
}
