"use client";

import Link from "next/link";
import NextImage from "next/image";
import { cn } from "@/utils/helpers";

export interface BrandLogoProps {
  animate?: boolean;
  className?: string;
}


const BrandLogo: React.FC<BrandLogoProps> = ({ className }) => {
  return (
    <Link href="/" className={cn("relative flex items-center justify-center hover:scale-105 transition-transform duration-300", className)}>
      <svg
        width="44"
        height="44"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="group/logo text-white hover:text-neon-red transition-all duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.15)] hover:drop-shadow-[0_0_15px_rgba(255,0,60,0.6)]"
      >
        {/* Modern Stand */}
        <path
          d="M8 21L10 18H14L16 21H8Z"
          fill="currentColor"
          opacity="0.8"
        />

        {/* Thin Bezel Frame */}
        <rect
          x="1"
          y="5"
          width="22"
          height="13"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.5"
          className="fill-black/40"
        />

        {/* Screen/Panel */}
        <rect
          x="2.5"
          y="6.5"
          width="19"
          height="10"
          rx="0.5"
          fill="currentColor"
          className="text-white/5 group-hover/logo:text-neon-red/20 transition-colors duration-300"
        />

        {/* Screen Glare/Reflection - Diagonal Sleek */}
        <path
          d="M16 6.5L13 16.5H2.5V8L8 6.5H16Z"
          fill="white"
          fillOpacity="0.05"
          className="group-hover/logo:fill-neon-red group-hover/logo:fill-opacity-10 transition-all duration-300"
        />

        {/* Power LED */}
        <circle
          cx="20"
          cy="16"
          r="0.4"
          className="fill-red-500 group-hover/logo:fill-neon-red animate-pulse"
        />
      </svg>
    </Link>
  );
};

export default BrandLogo;
