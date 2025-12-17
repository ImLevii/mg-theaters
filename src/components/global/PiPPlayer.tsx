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

    // Direct stream state
    const [streamUrl, setStreamUrl] = useState<string | null>(null);
    const [useIframe, setUseIframe] = useState(false);

    useEffect(() => {
        const fetchStream = async () => {
            if (!metadata) return;

            setStreamUrl(null);
            setUseIframe(false);

            try {
                const params = new URLSearchParams();
                params.append("id", metadata.id.toString());
                params.append("type", metadata.type);
                if (metadata.season) params.append("season", metadata.season.toString());
                if (metadata.episode) params.append("episode", metadata.episode.toString());

                const res = await fetch(`/api/stream?${params.toString()}`);

                if (res.status === 404) {
                    // Stream not found, expected fallback
                    setUseIframe(true);
                    return;
                }

                if (!res.ok) throw new Error(`Stream fetch failed: ${res.status}`);

                const data = await res.json();
                // Check for stream URL in expected response format
                if (data?.streamUrl) {
                    setStreamUrl(data.streamUrl);
                } else if (data?.sources?.[0]?.url) {
                    setStreamUrl(data.sources[0].url);
                } else {
                    // Valid JSON but no URL, fallback
                    setUseIframe(true);
                }
            } catch (error) {
                // Only log unexpected errors
                console.warn("Stream bypass unavailable, falling back to iframe");
                setUseIframe(true);
            }
        };

        if (isActive && !isMinimized) {
            fetchStream();
        } else {
            // If minimized or inactive, maybe default to iframe to be safe or keep playing? 
            // For now, let's allow it to try fetching even if minimized if it was already active
            // But usually we want to start fetching when it becomes active.
            // Actually, the original code uses `source` from store which is an embed URL.
            // We want to override that.
            if (isActive) fetchStream();
        }
    }, [metadata, isActive]);

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

            {/* Player Content */}
            <div className="w-full h-full relative z-0 bg-black">
                {!useIframe && streamUrl ? (
                    <video
                        src={streamUrl}
                        className={cn("w-full h-full object-contain", { "pointer-events-none": isResizing })}
                        controls
                        autoPlay
                        playsInline
                        onError={() => setUseIframe(true)}
                    />
                ) : (
                    <iframe
                        src={source}
                        className={cn("w-full h-full", { "pointer-events-none": isResizing })}
                        allowFullScreen
                        sandbox="allow-scripts"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="no-referrer"
                    />
                )}
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
