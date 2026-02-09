import { siteConfig } from "@/config/site";
import { cn } from "@/utils/helpers";
import { Link, Tab, Tabs, TabsProps } from "@heroui/react";
import { usePathname } from "next/navigation";

interface NavbarMenuItemsProps extends TabsProps {
  withIcon?: boolean;
  menuArray?: {
    href: string;
    label: string;
    icon?: React.ReactNode;
    activeIcon?: React.ReactNode;
  }[];
}

const NavbarMenuItems: React.FC<NavbarMenuItemsProps> = ({
  menuArray = siteConfig.navItems,
  isVertical,
  withIcon,
  variant = "underlined",
  size = "lg",
}) => {
  const pathName = usePathname();

  return (
    <Tabs
      size={size}
      variant={variant}
      selectedKey={pathName}
      isVertical={isVertical}
      classNames={{
        tabList: cn("gap-1 p-1 rounded-2xl bg-white/[0.03]", isVertical && "gap-3"),
        tab: cn(
          "h-full px-4 py-2 rounded-xl transition-all duration-300",
          "data-[hover=true]:bg-white/[0.05]",
          "data-[selected=true]:bg-neon-red/10"
        ),
        cursor: "bg-neon-red/20 rounded-xl shadow-[0_0_20px_rgba(229,9,20,0.15)]",
        tabContent: "group-data-[selected=true]:text-neon-red transition-colors duration-300",
      }}
    >
      {menuArray.map((item) => {
        const isActive = pathName === item.href;
        let title: React.ReactNode = item.label;

        if (withIcon) {
          title = (
            <div className="flex items-center gap-2.5">
              <div
                className={cn(
                  "w-[18px] h-[18px] flex items-center justify-center transition-transform duration-300",
                  isActive && "scale-110"
                )}
              >
                {isActive ? item.activeIcon : item.icon}
              </div>
              <span
                className={cn(
                  "font-orbitron font-bold text-[11px] uppercase tracking-[0.15em] transition-all duration-300",
                  isActive && "text-shadow-neon-red"
                )}
              >
                {item.label}
              </span>
            </div>
          );
        }

        return (
          <Tab as={Link} href={item.href} key={item.href} className="text-start" title={title} />
        );
      })}
    </Tabs>
  );
};

export default NavbarMenuItems;
