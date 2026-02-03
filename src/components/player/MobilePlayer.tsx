"use client";

import { useEffect, useRef, useState } from "react";
import Video from "next-video";
import { useRouter } from "next/navigation"; // App router
import { Loader2 } from "lucide-react";

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

export default function MobilePlayer({
    id,
    type,
    season,
    episode,
    onEnded,
    title,
    poster,
    onError,
}: MobilePlayerProps) {
    const router = useRouter();
    const [streamUrl, setStreamUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

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

    if (loading) {
        return (
            <div className="flex h-full w-full items-center justify-center bg-black text-white">
                <Loader2 className="animate-spin" size={48} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-full w-full items-center justify-center bg-black text-white">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="relative h-full w-full bg-black">
            {streamUrl && (
                <Video
                    src={streamUrl}
                    className="h-full w-full"
                    controls
                    autoPlay
                    onEnded={handleEnded}
                    poster={poster}
                />
            )}
        </div>
    );
}
