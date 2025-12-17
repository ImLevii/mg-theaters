import { cn } from "@/utils/helpers";
import { Tooltip } from "@heroui/react";
import Link from "next/link";

interface ActionButtonProps {
  label: string;
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  tooltip?: string;
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  href = "",
  children,
  onClick,
  tooltip,
  disabled,
}) => {
  const Button = (
    <Tooltip content={tooltip} isDisabled={disabled || !tooltip} showArrow placement="bottom">
      <button
        aria-label={label}
        onClick={onClick}
        disabled={disabled}
        className={cn("group p-1 sm:p-2 rounded-full drop-shadow-md transition-background hover:bg-white/10 [&>svg]:transition-all", {
          "hover:[&>svg]:scale-110 [&>svg]:hover:text-primary": !disabled,
          "cursor-not-allowed opacity-50": disabled,
        })}
      >
        {children}
      </button>
    </Tooltip>
  );

  return href ? (
    <Link href={href} className="flex items-center">
      {Button}
    </Link>
  ) : (
    Button
  );
};

export default ActionButton;
