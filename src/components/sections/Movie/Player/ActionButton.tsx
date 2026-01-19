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
}

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  href = "",
  children,
  onClick,
  tooltip,
  disabled,
}) => {
  const mobile = useIsMobile();
  // Handle touch interactions to prevent double-tap issues on mobile
  const handleTouchEnd = (e: React.TouchEvent) => {
    // Only prevent default if not disabled, to ensure click passes through immediately
    // or manually trigger click. Often best to leave standard behavior but check hover interactions.
    // However, the issue is often sticky hover states.
    if (!disabled && onClick) {
      // e.preventDefault(); // CAREFUL: This might block scrolling if not handled well.
      // Better strategy: Ensure 'mobile' prop disables the Tooltip completely.
    }
  };

  const Button = (
    <Tooltip
      content={tooltip}
      isDisabled={disabled || !tooltip || mobile}
      showArrow
      placement="bottom"
      // Ensure specific delay to prevent accidental showing on quick taps if it was enabled
      closeDelay={0}
    >
      <button
        aria-label={label}
        onClick={onClick}
        loading="lazy" /* HTML attribute, might be ignored but harmless */
        disabled={disabled}
        className={cn("group p-2 sm:p-2 rounded-full drop-shadow-md transition-background hover:bg-white/10 [&>svg]:transition-all", {
          // Remove hover effects on mobile to prevent sticky states needing a second tap to clear
          "hover:[&>svg]:scale-110 [&>svg]:hover:text-primary": !disabled && !mobile,
          "active:scale-95": !disabled, // Add active state for touch feedback
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
