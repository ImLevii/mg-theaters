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
    <Link href="/" className={cn("relative flex items-center justify-center gap-1 font-black tracking-tighter hover:scale-105 transition-transform duration-300", className)}>
      <span className="text-neon-red text-2xl md:text-3xl font-mono">⇋</span>
      <span className="text-white text-2xl md:text-3xl tracking-widest font-sans">MG</span>
      <span className="text-neon-red text-2xl md:text-3xl font-mono">⇌</span>
      <span className="text-neon-red text-2xl md:text-3xl ml-1 font-sans">TV</span>
    </Link>
  );
};

export default BrandLogo;
