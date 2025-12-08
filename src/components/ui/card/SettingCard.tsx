"use client";

import React from "react";
import { cn } from "@/utils/helpers";
import { ChevronRight } from "lucide-react";

interface SettingCardProps {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    isActive?: boolean;
    onClick?: () => void;
    className?: string;
}

const SettingCard: React.FC<SettingCardProps> = ({
    icon,
    title,
    subtitle,
    isActive = false,
    onClick,
    className,
}) => {
    return (
        <div
            onClick={onClick}
            className={cn(
                "group relative flex cursor-pointer items-center justify-between rounded-xl border bg-black/40 p-4 transition-all duration-300",
                isActive
                    ? "border-neon-green shadow-[0_0_10px_rgba(0,255,157,0.2),inset_0_0_5px_rgba(0,255,157,0.05)]"
                    : "border-white/10 hover:border-white/20",
                className
            )}
        >
            <div className="flex items-center gap-4">
                <div
                    className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300",
                        isActive
                            ? "bg-neon-green/10 text-neon-green shadow-[0_0_10px_rgba(0,255,157,0.3)]"
                            : "bg-white/5 text-gray-400 group-hover:text-gray-200"
                    )}
                >
                    {icon}
                </div>
                <div className="flex flex-col">
                    <span
                        className={cn(
                            "text-sm font-bold uppercase tracking-wider transition-colors duration-300",
                            isActive ? "text-neon-green" : "text-gray-300 group-hover:text-white"
                        )}
                    >
                        {title}
                    </span>
                    {subtitle && (
                        <span className="text-xs font-medium text-gray-500 transition-colors duration-300 group-hover:text-gray-400">
                            {subtitle}
                        </span>
                    )}
                </div>
            </div>
            <ChevronRight
                className={cn(
                    "h-5 w-5 transition-all duration-300",
                    isActive ? "text-neon-green" : "text-gray-600 group-hover:text-gray-400"
                )}
            />
        </div>
    );
};

export default SettingCard;
