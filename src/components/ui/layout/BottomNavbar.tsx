"use client";

import { siteConfig } from "@/config/site";
import { cn } from "@/utils/helpers";
import { Link } from "@heroui/link";
import { usePathname } from "next/navigation";

const BottomNavbar = () => {
  const pathName = usePathname();
  // Show on all pages except player pages
  const show = !pathName.includes("/player");

  return (
    show && (
      <>
        {/* Spacer to prevent content from being hidden behind navbar */}
        <div className="h-[calc(5.5rem+env(safe-area-inset-bottom))] md:hidden" aria-hidden="true" />

        {/* Navigation Container */}
        <nav
          className={cn(
            "fixed bottom-0 left-0 right-0 z-[9999] block md:hidden",
            // Glassmorphism background
            "bg-gradient-to-t from-black/95 via-black/80 to-black/60",
            "backdrop-blur-2xl backdrop-saturate-150",
            // Subtle top border
            "border-t border-white/[0.06]",
            // Safe area padding
            "pb-[max(8px,env(safe-area-inset-bottom))]"
          )}
        >
          {/* Top accent glow line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neon-red/30 to-transparent" />

          {/* Top subtle reflection */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

          {/* Navigation Items */}
          <div className="relative mx-auto grid h-full max-w-md grid-cols-5 items-center px-2 pt-2">
            {siteConfig.navItems.map((item) => {
              const isActive = pathName === item.href;

              return (
                <Link
                  href={item.href}
                  key={item.href}
                  className="group flex flex-col items-center justify-center gap-0.5 text-foreground outline-none"
                >
                  {/* Icon Container */}
                  <div
                    className={cn(
                      "relative flex items-center justify-center rounded-2xl transition-all duration-300 ease-out",
                      "h-11 w-11",
                      {
                        // Active state - neon glow effect
                        "bg-neon-red/15 text-neon-red scale-105": isActive,
                        // Inactive state
                        "text-white/40 group-hover:text-white/70 group-hover:bg-white/[0.05] scale-100":
                          !isActive,
                      }
                    )}
                  >
                    {/* Active glow ring */}
                    {isActive && (
                      <div className="absolute inset-0 rounded-2xl bg-neon-red/20 blur-xl animate-pulse-slow" />
                    )}

                    {/* Icon */}
                    <div className="relative h-5 w-5 flex items-center justify-center">
                      {isActive ? item.activeIcon : item.icon}
                    </div>
                  </div>

                  {/* Label */}
                  <span
                    className={cn(
                      "text-[10px] font-semibold tracking-wide transition-all duration-300",
                      {
                        "text-neon-red": isActive,
                        "text-white/35 group-hover:text-white/60": !isActive,
                      }
                    )}
                  >
                    {item.label}
                  </span>

                  {/* Active indicator dot */}
                  <div
                    className={cn(
                      "h-1 w-1 rounded-full transition-all duration-300",
                      {
                        "bg-neon-red shadow-[0_0_6px_rgba(229,9,20,0.8)] opacity-100": isActive,
                        "bg-transparent opacity-0": !isActive,
                      }
                    )}
                  />
                </Link>
              );
            })}
          </div>
        </nav>
      </>
    )
  );
};

export default BottomNavbar;
