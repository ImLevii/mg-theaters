import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import Video from "next-video";
import { useRouter } from "next/navigation"; // App router
import { Loader2 } from "lucide-react";
import { cn } from "@/utils/helpers";

interface MobilePlayerProps {
    id: number | string;
    type: "movie" | "tv";
    season?: number;
    episode?: number;
    onEnded?: () => void;
    // Metadata for overlay/UI if needed
    title?: string;
    poster?: string;
    onError?: () => void;
}

const MobilePlayer = forwardRef<HTMLVideoElement, MobilePlayerProps>(({
    id,
    type,
    season,
    episode,
    onEnded,
    title,
    poster,
    onError,
}, ref) => {
    const router = useRouter();
    const [streamUrl, setStreamUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Expose the video element through the ref
    useImperativeHandle(ref, () => videoRef.current!);

    useEffect(() => {
        const fetchStream = async () => {
            setLoading(true);
            setError(null);
            try {
                let url = `/api/stream?id=${id}&type=${type}`;
                if (type === "tv") {
                    url += `&season=${season}&episode=${episode}`;
                }

                console.log("[MobilePlayer] Fetching stream from:", url);
                const res = await fetch(url);

                if (!res.ok) {
                    const errorText = await res.text();
                    console.error("[MobilePlayer] Fetch failed:", res.status, errorText);
                    throw new Error(`Failed to fetch stream: ${res.status}`);
                }

                const data = await res.json();
                console.log("[MobilePlayer] Stream data received:", data);

                if (data.stream && data.stream.playlist) {
                    setStreamUrl(data.stream.playlist);
                } else {
                    console.error("[MobilePlayer] No playlist found in data");
                    throw new Error("No stream URL found");
                }
            } catch (err) {
                console.error("Error fetching stream:", err);
                // setError("Failed to load video."); // Don't show error text, trigger fallback
                if (onError) onError();
            } finally {
                setLoading(false);
            }
        };

        fetchStream();
    }, [id, type, season, episode]);

    const handleEnded = () => {
        if (onEnded) {
            onEnded();
        }
    };

    // Safety check for ended state on mobile browsers that might miss the 'ended' event
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const checkEnded = () => {
            if (video.duration > 0 && video.currentTime >= video.duration - 0.5) {
                // If it's near the end and paused/ended, treat as ended
                if (video.paused || video.ended) {
                    handleEnded();
                }
            }
        };

        video.addEventListener("timeupdate", checkEnded);
        return () => video.removeEventListener("timeupdate", checkEnded);
    }, [onEnded]);

    return (
        <div className="relative h-full w-full bg-black flex items-center justify-center">
            {loading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50 backdrop-blur-sm text-white">
                    <Loader2 className="animate-spin" size={48} />
                </div>
            )}

            <Video
                ref={videoRef}
                src={streamUrl || ""}
                className={cn("h-full w-full object-contain", { "opacity-0": !streamUrl })}
                controls
                autoPlay
                playsInline
                onEnded={handleEnded}
                poster={poster}
                style={{ WebkitAppearance: 'none', maxHeight: '100%', maxWidth: '100%' }}
            />
        </div>
    );
});

MobilePlayer.displayName = "MobilePlayer";

export default MobilePlayer;
