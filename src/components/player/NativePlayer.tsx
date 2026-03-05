import { useEffect, useRef, useState, forwardRef, useImperativeHandle, useCallback } from "react";
import Video from "next-video";
import { useRouter } from "next/navigation"; // App router
import { Loader2 } from "lucide-react";
import { cn } from "@/utils/helpers";

interface NativePlayerProps {
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

const NativePlayer = forwardRef<HTMLVideoElement, NativePlayerProps>(({
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
    const sentEnded = useRef(false);
    const onEndedRef = useRef(onEnded);

    // Keep onEnded context fresh without re-triggering effects
    useEffect(() => {
        onEndedRef.current = onEnded;
    }, [onEnded]);

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

                console.log("[NativePlayer] Fetching stream from:", url);
                const res = await fetch(url);

                if (!res.ok) {
                    const errorText = await res.text();
                    console.error("[NativePlayer] Fetch failed:", res.status, errorText);
                    throw new Error(`Failed to fetch stream: ${res.status}`);
                }

                const data = await res.json();
                console.log("[NativePlayer] Stream data received:", !!data.stream);

                if (data.stream && data.stream.playlist) {
                    console.log("[NativePlayer] Setting stream URL:", data.stream.playlist.substring(0, 50) + "...");
                    setStreamUrl(data.stream.playlist);
                } else {
                    console.error("[NativePlayer] No playlist found in data");
                    throw new Error("No stream URL found");
                }
            } catch (err) {
                console.error("Error fetching stream:", err);
                if (onError) onError();
            } finally {
                setLoading(false);
            }
        };

        sentEnded.current = false; // Reset for new stream
        fetchStream();
    }, [id, type, season, episode]);

    const handleEnded = useCallback(() => {
        if (sentEnded.current) return;
        sentEnded.current = true;
        
        console.log("[NativePlayer] handleEnded triggered");
        if (onEndedRef.current) {
            onEndedRef.current();
        }
    }, []);

    // Safety check for ended state
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const checkEnded = () => {
            if (video.duration > 0 && video.currentTime >= video.duration - 2) {
                console.log(`[NativePlayer] Near end: ${video.currentTime.toFixed(2)}/${video.duration.toFixed(2)} ended:${video.ended} paused:${video.paused}`);
                
                if (video.ended) {
                    console.log("[NativePlayer] Safety check: video.ended is true");
                    handleEnded();
                } else if (video.paused && video.currentTime > 10) { 
                     console.log("[NativePlayer] Safety check: video.paused near end");
                     handleEnded();
                }
            }
        };

        video.addEventListener("timeupdate", checkEnded);
        video.addEventListener("ended", handleEnded);
        
        return () => {
            video.removeEventListener("timeupdate", checkEnded);
            video.removeEventListener("ended", handleEnded);
        };
    }, [handleEnded]);

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

NativePlayer.displayName = "NativePlayer";

export default NativePlayer;
