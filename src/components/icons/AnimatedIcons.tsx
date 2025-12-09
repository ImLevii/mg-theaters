import React from "react";

export const AnimatedPlayIcon = () => (
    <div className="relative w-6 h-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        {/* Outer Tech Ring - Rotating */}
        <svg
            className="absolute inset-0 w-full h-full text-current opacity-90 animate-[spin_4s_linear_infinite]"
            viewBox="0 0 24 24"
            fill="none"
        >
            <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1" strokeDasharray="15 40" strokeLinecap="round" />
            <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1" strokeDasharray="0 55 5 100" strokeLinecap="round" strokeOpacity="0.5" />
        </svg>

        {/* Inner Reactor Ring - Counter Rotating */}
        <svg
            className="absolute inset-0 w-full h-full text-current opacity-70 animate-[spin_3s_linear_infinite_reverse]"
            viewBox="0 0 24 24"
            fill="none"
        >
            <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
        </svg>

        {/* Bold Play Triangle */}
        <svg
            className="relative w-3.5 h-3.5 ml-0.5 text-current drop-shadow-[0_0_8px_currentColor]"
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path d="M7 5V19L18 12L7 5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
    </div>
);

export const AnimatedInfoIcon = () => (
    <div className="relative w-6 h-6 flex items-center justify-center">
        {/* Rotating Radar Sweep */}
        <svg
            className="absolute inset-0 w-full h-full animate-[spin_3s_linear_infinite]"
            viewBox="0 0 24 24"
            fill="none"
        >
            <path
                d="M12 12L12 2A10 10 0 0 1 22 12"
                stroke="currentColor"
                strokeWidth="1"
                strokeOpacity="0.2"
                fill="url(#radar-gradient)"
                fillOpacity="0.2"
            />
            <defs>
                <linearGradient id="radar-gradient" x1="12" y1="12" x2="12" y2="2">
                    <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
                    <stop offset="100%" stopColor="currentColor" stopOpacity="0.5" />
                </linearGradient>
            </defs>
        </svg>

        {/* Tech Brackets */}
        <svg
            className="absolute inset-0 w-full h-full text-current"
            viewBox="0 0 24 24"
            fill="none"
        >
            <path d="M2 7V2H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M22 7V2H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M22 17V22H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 17V22H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        {/* Floating 'i' */}
        <div className="relative flex flex-col items-center gap-0.5 animate-pulse">
            <div className="w-1 h-1 bg-current rounded-full shadow-[0_0_5px_currentColor]" />
            <div className="w-1 h-2.5 bg-current rounded-sm shadow-[0_0_5px_currentColor]" />
        </div>
    </div>
);

export const AnimatedTrendingIcon = () => (
    <div className="relative w-6 h-6 flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-300">
        {/* Pulsing Glow behind */}
        <div className="absolute inset-0 bg-current opacity-20 blur-md rounded-full animate-pulse" />

        {/* Rising Graph Line */}
        <svg
            className="relative w-full h-full text-current drop-shadow-[0_0_8px_currentColor]"
            viewBox="0 0 24 24"
            fill="none"
        >
            <path
                d="M3 17L9 11L13 15L21 7"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-[dash_2s_linear_infinite]"
                strokeDasharray="25"
                strokeDashoffset="25"
            />
            <path
                d="M21 7H15M21 7V13"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>

        {/* Inline Keyframes for dash animation */}
        <style jsx>{`
            @keyframes dash {
                to {
                    stroke-dashoffset: 0;
                }
            }
        `}</style>
    </div>
);
