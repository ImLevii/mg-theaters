"use client";

import BackButton from "@/components/ui/button/BackButton";
import { siteConfig } from "@/config/site";
import { cn } from "@/utils/helpers";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useWindowScroll } from "@mantine/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import FullscreenToggleButton from "../button/FullscreenToggleButton";
import UserProfileButton from "../button/UserProfileButton";
import SearchInput from "../input/SearchInput";
import BrandLogo from "../other/BrandLogo";

import NavbarMenuItems from "../other/NavbarMenuItems";

const TopNavbar = () => {
  const pathName = usePathname();
  const [{ y }] = useWindowScroll();
  const hrefs = siteConfig.navItems.map((item) => item.href);
  const show = hrefs.includes(pathName);
  const player = pathName.includes("/player");
  const auth = pathName.includes("/auth");
  const isScrolled = y > 10;

  if (auth || player) return null;

  return (
    <Navbar
      disableScrollHandler
      isBlurred={false}
      position="sticky"
      maxWidth="full"
      classNames={{
        wrapper: "px-4 md:px-6 h-16 mx-auto w-[1280px] max-w-full",
      }}
      className={cn(
        "fixed top-0 left-0 w-full transition-all duration-500 ease-out z-[100]",
        "before:absolute before:inset-0 before:transition-opacity before:duration-500",
        {
          // Glassmorphism effect when scrolled or on nav pages
          "before:opacity-100 before:bg-gradient-to-b before:from-black/80 before:via-black/60 before:to-black/40 before:backdrop-blur-xl before:border-b before:border-white/[0.08]": show || isScrolled,
          "before:opacity-0 before:bg-transparent": !show && !isScrolled,
        }
      )}
    >
      {/* Subtle top accent line */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-[1px] transition-opacity duration-500",
          "bg-gradient-to-r from-transparent via-neon-red/50 to-transparent",
          {
            "opacity-100": show || isScrolled,
            "opacity-0": !show && !isScrolled,
          }
        )}
      />

      <NavbarContent justify="start" className="gap-6 relative z-10">
        <NavbarBrand className="gap-5">
          <BrandLogo />
          <div className="hidden md:flex">
            <NavbarMenuItems withIcon />
          </div>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end" className="gap-2 relative z-10">
        {/* Discord Button */}
        <Button
          isIconOnly
          variant="light"
          className={cn(
            "hidden sm:flex text-white/50 hover:text-white",
            "hover:bg-white/[0.08] transition-all duration-300",
            "rounded-xl"
          )}
        >
          <Icon icon="ic:baseline-discord" width={22} />
        </Button>

        {/* User Profile */}
        <NavbarItem className="flex gap-1">
          <UserProfileButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
export default TopNavbar;
