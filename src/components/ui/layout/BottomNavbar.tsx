"use client";

import { siteConfig } from "@/config/site";
import clsx from "clsx";
import { Link } from "@heroui/link";
import { usePathname } from "next/navigation";
import { Chip } from "@heroui/chip";

const BottomNavbar = () => {
  const pathName = usePathname();
  const hrefs = siteConfig.navItems.map((item) => item.href);
  const show = hrefs.includes(pathName);

  return (
    show && (
      <>
        <div className="pt-20 md:hidden" />
        <div className="fixed bottom-0 left-0 z-50 block h-fit w-full translate-y-px border-t border-white/5 bg-black/60 backdrop-blur-2xl py-2 pb-5 md:hidden">
          <div className="mx-auto grid h-full max-w-lg grid-cols-5 items-center px-2">
            {siteConfig.navItems.map((item) => {
              const isActive = pathName === item.href;
              return (
                <Link
                  href={item.href}
                  key={item.href}
                  className="group flex flex-col items-center justify-center gap-1 text-foreground"
                >
                  <div
                    className={clsx("flex items-center justify-center rounded-2xl p-2 transition-all duration-500 ease-out", {
                      "bg-neon-red/10 text-neon-red shadow-[0_0_20px_rgba(255,0,60,0.3)] scale-110": isActive,
                      "text-gray-500 group-hover:text-gray-300 scale-100": !isActive,
                    })}
                  >
                    {isActive ? item.activeIcon : item.icon}
                  </div>
                  <p
                    className={clsx("text-[10px] font-bold tracking-wide transition-colors duration-300", {
                      "text-neon-red drop-shadow-[0_0_5px_rgba(255,0,60,0.5)]": isActive,
                      "text-gray-600 group-hover:text-gray-400": !isActive,
                    })}
                  >
                    {item.label}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </>
    )
  );
};

export default BottomNavbar;
