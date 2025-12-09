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
  const opacity = Math.min((y / 1000) * 5, 1);
  const hrefs = siteConfig.navItems.map((item) => item.href);
  const show = hrefs.includes(pathName);
  const tv = pathName.includes("/tv/");
  const player = pathName.includes("/player");
  const auth = pathName.includes("/auth");

  if (auth || player) return null;

  return (
    <Navbar
      disableScrollHandler
      isBlurred={false}
      position="sticky"
      maxWidth="full"
      classNames={{ wrapper: "px-4 md:px-0 h-16 mx-auto w-[1250px] max-w-full" }}
      className={cn("fixed top-0 left-0 w-full transition-all duration-300 z-50", {
        "bg-black/50 backdrop-blur-md border-b border-white/5": show || y > 10,
        "bg-transparent": !show && y <= 10
      })}
    >
      <NavbarContent justify="start" className="gap-8">
        <NavbarBrand className="gap-4">
          <BrandLogo />
          <div className="hidden md:flex">
            <NavbarMenuItems withIcon />
          </div>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end" className="gap-4">
        {/* Search */}


        {/* Icons */}
        <Button isIconOnly variant="light" className="text-white/70 hover:text-white hidden sm:flex">
          <Icon icon="ic:baseline-discord" width={22} />
        </Button>




        <NavbarItem className="flex gap-1">
          <UserProfileButton />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
export default TopNavbar;
