"use client";

import { usePiPStore } from "@/hooks/usePiPStore";
import { cn } from "@/utils/helpers";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import useBreakpoints from "@/hooks/useBreakpoints";

const PiPPlayer = () => {
    const { isActive, isMinimized, source, title, metadata, closePiP, toggleMinimize } =
        usePiPStore();
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);
    const { mobile } = useBreakpoints();

    // Resizing state
    const [width, setWidth] = useState(320);
    const [isResizing, setIsResizing] = useState(false);

    const startResizing = (e: React.MouseEvent) => {
        setIsResizing(true);
        e.preventDefault();
    };

    const stopResizing = () => {
        setIsResizing(false);
    };

    const resize = (e: MouseEvent) => {
        if (isResizing) {
            const newWidth = window.innerWidth - e.clientX;
            if (newWidth > 200 && newWidth < 800) {
                setWidth(newWidth);
            }
        }
    };

    useEffect(() => {
        if (isResizing) {
            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResizing);
        } else {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResizing);
        }
        return () => {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResizing);
        };
    }, [isResizing]);

    if (!isActive || !source) return null;

    const handleExpand = () => {
        // Navigate back to the full player page
        if (metadata?.type === "movie") {
            router.push(`/movie/${metadata.id}/player`);
        } else if (metadata?.type === "tv" && metadata.season && metadata.episode) {
            router.push(
                `/tv/${metadata.id}/${metadata.season}/${metadata.episode}/player`
            );
        }
        closePiP();
    };

    return (
        <div
            className={cn(
                "fixed z-[9999] transition-all duration-300 shadow-2xl overflow-hidden bg-black border border-white/10",
                !isMinimized && "bottom-0 right-0 w-full h-full rounded-none",
                // Mobile Minimized: Above bottom nav (90px), centered with margin
                isMinimized && mobile && "bottom-[90px] left-4 right-4 h-auto aspect-video rounded-lg",
                // Desktop Minimized: Bottom right corner, dynamic width
                isMinimized && !mobile && "bottom-4 right-4 aspect-video rounded-lg"
            )}
            style={isMinimized && !mobile ? { width: `${width}px` } : {}}
            id="pip-player-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Controls Overlay */}
            <div
                className={cn(
                    "absolute top-0 left-0 right-0 z-20 flex justify-between items-start bg-gradient-to-b from-black/80 to-transparent p-3 transition-opacity duration-300 pointer-events-none",
                    // Force visibility on mobile (touch devices) or when hovered/resizing
                    (isHovered || !isMinimized || isResizing || mobile) ? "opacity-100" : "opacity-0 md:opacity-0"
                )}
            >
                <h6 className="text-xs font-semibold text-white/90 truncate max-w-[200px] pointer-events-auto select-none drop-shadow-md">
                    {title}
                </h6>
                <div className="flex gap-3 pointer-events-auto">
                    {/* Native Buttons for robust touch handling */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleExpand();
                        }}
                        className="p-2 text-white hover:text-neon-green active:scale-95 transition-transform"
                        aria-label="Expand"
                    >
                        <Icon icon="akar-icons:enlarge" width="20" height="20" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            closePiP();
                        }}
                        className="p-2 text-white hover:text-red-500 active:scale-95 transition-transform"
                        aria-label="Close"
                    >
                        <Icon icon="mingcute:close-line" width="22" height="22" />
                    </button>
                </div>
            </div>

            {/* Iframe Wrapper to ensure clicks pass through if needed, but usually iframe handles its own events */}
            <div className="w-full h-full relative z-0">
                <iframe
                    src={source}
                    className={cn("w-full h-full", { "pointer-events-none": isResizing })}
                    allowFullScreen
                    sandbox="allow-scripts allow-same-origin allow-forms allow-presentation"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                />
            </div>

            {/* Overlay to capture mouse events when resizing - DISABLED ON MOBILE */}
            {isResizing && !mobile && <div className="absolute inset-0 z-50 bg-transparent cursor-ew-resize" />}

            {/* Resize Handle (Desktop Only) */}
            {isMinimized && !mobile && (
                <div
                    className="absolute top-0 left-0 bottom-0 w-4 cursor-ew-resize z-30 hidden md:block hover:bg-white/10 transition-colors"
                    onMouseDown={startResizing}
                >
                    <div className="absolute top-1/2 left-1 -translate-y-1/2 flex flex-col gap-0.5">
                        <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                        <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                        <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PiPPlayer;
