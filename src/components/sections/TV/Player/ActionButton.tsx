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
  variant?: "default" | "neon";
}

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  href = "",
  children,
  onClick,
  tooltip,
  disabled,
  variant = "default",
}) => {
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (disabled || !onClick) return;
    e.preventDefault();
    onClick();
  };

  const Button = (
    <Tooltip 
      content={tooltip} 
      isDisabled={disabled || !tooltip} 
      showArrow 
      placement="bottom"
      classNames={{
        content: "bg-black/80 backdrop-blur-md text-white border border-white/10 font-orbitron text-[10px] tracking-widest",
      }}
    >
      <button
        type="button"
        aria-label={label}
        onClick={onClick}
        onTouchEnd={handleTouchEnd}
        disabled={disabled}
        className={cn(
          "group relative flex items-center justify-center transition-all duration-300",
          "cursor-pointer outline-none",
          {
            // Neon Variant
            "h-10 w-10 sm:h-12 sm:w-12 rounded-xl": variant === "neon",
            "bg-white/5 hover:bg-white/10 border border-white/10": variant === "neon",
            "backdrop-blur-md shadow-lg hover:shadow-white/5": variant === "neon",
            "text-white/70 hover:text-white": variant === "neon" && !disabled,
            
            // Default styling
            "drop-shadow-md hover:scale-110": variant === "default" && !disabled,
            "opacity-50 cursor-not-allowed": disabled,
          }
        )}
      >
        {variant === "neon" && !disabled && (
          <div className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
        )}
        <div className={cn("relative z-10 transition-transform duration-300 group-hover:scale-110", {
          "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]": variant === "neon" && !disabled
        })}>
          {children}
        </div>
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
