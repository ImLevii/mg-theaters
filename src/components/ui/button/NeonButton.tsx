"use client";

import React from "react";
import { cn } from "@/utils/helpers";

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "green" | "red" | "blue" | "purple";
    glow?: boolean;
    children: React.ReactNode;
    icon?: React.ReactNode;
}

const NeonButton: React.FC<NeonButtonProps> = ({
    variant = "green",
    glow = true,
    className,
    children,
    icon,
    ...props
}) => {
    const variants = {
        green: "border-neon-green text-neon-green hover:bg-neon-green/10",
        red: "border-neon-red text-neon-red hover:bg-neon-red/10",
        blue: "border-neon-blue text-neon-blue hover:bg-neon-blue/10",
        purple: "border-neon-purple text-neon-purple hover:bg-neon-purple/10",
    };

    const glows = {
        green: "shadow-[0_0_15px_rgba(0,255,157,0.4),inset_0_0_5px_rgba(0,255,157,0.2)] hover:shadow-[0_0_25px_rgba(0,255,157,0.6),inset_0_0_10px_rgba(0,255,157,0.3)]",
        red: "shadow-[0_0_15px_rgba(255,0,60,0.4),inset_0_0_5px_rgba(255,0,60,0.2)] hover:shadow-[0_0_25px_rgba(255,0,60,0.6),inset_0_0_10px_rgba(255,0,60,0.3)]",
        blue: "shadow-[0_0_15px_rgba(0,243,255,0.4),inset_0_0_5px_rgba(0,243,255,0.2)] hover:shadow-[0_0_25px_rgba(0,243,255,0.6),inset_0_0_10px_rgba(0,243,255,0.3)]",
        purple: "shadow-[0_0_15px_rgba(188,19,254,0.4),inset_0_0_5px_rgba(188,19,254,0.2)] hover:shadow-[0_0_25px_rgba(188,19,254,0.6),inset_0_0_10px_rgba(188,19,254,0.3)]",
    };

    return (
        <button
            className={cn(
                "group relative flex items-center justify-center gap-2 rounded-lg border border-opacity-80 px-4 py-2 text-sm font-semibold uppercase tracking-wider transition-all duration-300 overflow-hidden",
                variants[variant],
                glow && glows[variant],
                className
            )}
            {...props}
        >
            {/* Shine Animation */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shine_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />

            <div className="relative flex items-center gap-2 z-10">
                {icon && <span className="text-lg">{icon}</span>}
                {children}
            </div>

            {/* Inline shine keyframes if needed globally or here */}
            <style jsx>{`
                @keyframes shine {
                    100% {
                        transform: translateX(100%);
                    }
                }
            `}</style>
        </button>
    );
};

export default NeonButton;
