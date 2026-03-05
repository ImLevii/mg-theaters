import { cn } from "@/utils/helpers";
import { Tooltip } from "@heroui/react";
import Link from "next/link";

import useIsMobile from "@/hooks/useIsMobile";

interface ActionButtonProps {
  label: string;
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  tooltip?: string;
  disabled?: boolean;
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | "neon";
  className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  href = "",
  children,
  onClick,
  tooltip,
  disabled,
  variant = "default",
  className,
}) => {
  const mobile = useIsMobile();
  // Handle touch interactions to prevent double-tap issues on mobile
  const handleTouchEnd = (e: React.TouchEvent) => {
    // Check for disabled state
    if (disabled) return;
    
    // Check if the target is interactive and if we have an onClick handler
    if (onClick) {
      // Trigger click manually to ensure immediate response on some mobile browsers
      // while avoiding potential event duplication or ghost clicks
      onClick();
      // Optional: stop propagation if this is inside a link, but we handle that separately
    }
  };

  const variants = {
    default: "hover:bg-white/10",
    primary: "hover:bg-primary/20",
    secondary: "hover:bg-secondary/20",
    success: "hover:bg-success/20",
    warning: "hover:bg-warning/20",
    danger: "hover:bg-danger/20",
    neon: "hover:bg-primary/10 border border-white/5 hover:border-primary/50 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(var(--heroui-primary-rgb),0.3)]",
  };

  const Button = (
    <Tooltip
      content={tooltip}
      isDisabled={disabled || !tooltip || mobile}
      showArrow
      placement="bottom"
      // Ensure specific delay to prevent accidental showing on quick taps if it was enabled
      closeDelay={0}
      classNames={{
        content: "bg-black/80 backdrop-blur-md border border-white/10 text-xs font-medium py-1.5 px-3 rounded-lg",
      }}
    >
      <button
        type="button"
        aria-label={label}
        onClick={onClick}
        onTouchEnd={handleTouchEnd}
        disabled={disabled}
        className={cn(
          "group relative flex items-center justify-center p-2.5 sm:p-3 rounded-xl drop-shadow-md transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-sm bg-black/20",
          variants[variant],
          className,
          {
            // Remove hover effects on mobile to prevent sticky states needing a second tap to clear
            "sm:hover:[&>svg]:scale-110 sm:hover:text-primary active:scale-95": !disabled && !mobile,
            "active:scale-90": !disabled, // Add active state for touch feedback
            "cursor-not-allowed opacity-40 pointer-events-none": disabled,
          }
        )}
      >
        {children}
      </button>
    </Tooltip>
  );

  return href ? (
    <Link href={href} className="flex items-center" onClick={(e) => disabled && e.preventDefault()}>
      {Button}
    </Link>
  ) : (
    Button
  );
};

export default ActionButton;
