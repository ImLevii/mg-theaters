"use client";

import React from "react";
import { cn } from "@/utils/helpers";

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "green" | "red" | "blue" | "purple" | "orange" | "pink";
    glow?: boolean;
    solid?: boolean;
    children: React.ReactNode;
    icon?: React.ReactNode;
}

const NeonButton: React.FC<NeonButtonProps> = ({
    variant = "green",
    glow = true, // We'll keep this prop for compatibility but the style is now unified
    solid = false, // Unused but kept for interface compatibility
    className,
    children,
    icon,
    ...props
}) => {
    // Colors mapped from the request (Green) and our existing palette
    const colorStyles = {
        green: {
            color: "rgb(34, 197, 94)",
            textShadow: "rgba(34, 197, 94, 0.8) 0px 0px 8px",
            stroke: "#22c55e"
        },
        red: {
            color: "#FF2E63",
            textShadow: "rgba(255, 46, 99, 0.8) 0px 0px 8px",
            stroke: "#FF2E63"
        },
        blue: {
            color: "#00f3ff",
            textShadow: "rgba(0, 243, 255, 0.8) 0px 0px 8px",
            stroke: "#00f3ff"
        },
        purple: {
            color: "#bc13fe",
            textShadow: "rgba(188, 19, 254, 0.8) 0px 0px 8px",
            stroke: "#bc13fe"
        },
        orange: {
            color: "#FF8C00", // DarkOrange or similar neon orange
            textShadow: "rgba(255, 140, 0, 0.8) 0px 0px 8px",
            stroke: "#FF8C00"
        },
        pink: {
            color: "#FF007F",
            textShadow: "rgba(255, 0, 127, 0.8) 0px 0px 8px",
            stroke: "#FF007F"
        }
    };

    const currentStyle = colorStyles[variant];

    return (
        <button
            className={cn(
                "group relative flex items-center justify-center gap-3 px-4 py-2 rounded-md bg-gradient-to-r from-gray-800/60 to-gray-900/60 border border-white/10 backdrop-blur-sm hover:bg-gray-800/80 transition-all duration-300 cursor-pointer shadow-lg overflow-hidden",
                className
            )}
            style={{
                boxShadow: "rgba(255, 255, 255, 0.1) 0px 1px 0px inset, rgba(0, 0, 0, 0.2) 0px -1px 0px inset, rgba(0, 0, 0, 0.3) 0px 2px 8px"
            }}
            {...props}
        >
            <div className="relative flex items-center gap-2 z-10">
                {icon && (
                    <span
                        className="text-lg transition-transform duration-300 group-hover:scale-110"
                        style={{ color: currentStyle.stroke, filter: `drop-shadow(0 0 2px ${currentStyle.textShadow})` }}
                    >
                        {icon}
                    </span>
                )}

                <span
                    className="relative z-10 uppercase font-extrabold tracking-wider text-[10px] sm:text-xs font-orbitron whitespace-nowrap"
                    style={{
                        color: currentStyle.color,
                        textShadow: currentStyle.textShadow,
                        filter: "drop-shadow(rgba(0, 0, 0, 0.3) 0px 1px 2px)"
                    }}
                >
                    {children}
                </span>
            </div>

            {/* Shine Animation */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shine_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12" />

            {/* Inline shine keyframes if needed globally or here */}
            <style jsx>{`
                @keyframes shine {
                    100% {
                        transform: translateX(100%);
                    }
                }
            `}</style>
        </button >
    );
};

export default NeonButton;
