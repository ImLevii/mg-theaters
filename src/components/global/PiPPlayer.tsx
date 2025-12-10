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
        >
            {/* Controls Overlay */}
            <div
                className={cn(
                    "absolute top-0 left-0 right-0 z-20 flex justify-between items-start bg-gradient-to-b from-black/80 to-transparent p-2 transition-opacity duration-300 pointer-events-none",
                    (isHovered || !isMinimized || isResizing || mobile) ? "opacity-100" : "opacity-0"
                )}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <h6 className="text-xs font-semibold text-white/90 truncate max-w-[200px] pointer-events-auto">
                    {title}
                </h6>
                <div className="flex gap-1 pointer-events-auto">
                    <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={handleExpand}
                        className="text-white hover:text-neon-green"
                    >
                        <Icon icon="akar-icons:enlarge" width="16" />
                    </Button>
                    <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={closePiP}
                        className="text-white hover:text-red-500"
                    >
                        <Icon icon="mingcute:close-line" width="18" />
                    </Button>
                </div>
            </div>

            <iframe
                src={source}
                className={cn("w-full h-full", { "pointer-events-none": isResizing })}
                allowFullScreen
                allow="autoplay; encrypted-media"
            />

            {/* Overlay to capture mouse events when resizing */}
            {isResizing && <div className="absolute inset-0 z-50 bg-transparent" />}

            {/* Resize Handle (Desktop Only) */}
            {isMinimized && (
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
