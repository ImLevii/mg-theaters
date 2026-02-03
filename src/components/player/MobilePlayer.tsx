"use client";

import { useMemo } from "react";

interface MobilePlayerProps {
    id: number | string;
    type: "movie" | "tv";
    season?: number;
    episode?: number;
    onEnded?: () => void;
    title?: string;
    poster?: string;
    onError?: () => void;
}

export default function MobilePlayer({
    id,
    type,
    season,
    episode,
}: MobilePlayerProps) {
    const playerUrl = useMemo(() => {
        const baseUrl = "https://www.vidking.net/embed";
        const color = type === "movie" ? "006fee" : "f5a524";
        const params = `?color=${color}&autoplay=true&nextepisode=true&episodeselector=true`;

        if (type === "movie") {
            return `${baseUrl}/movie/${id}${params}`;
        }
        return `${baseUrl}/tv/${id}/${season}/${episode}${params}`;
    }, [id, type, season, episode]);

    return (
        <div className="relative h-full w-full bg-black">
            <iframe
                src={playerUrl}
                className="h-full w-full border-none"
                allowFullScreen
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            />
        </div>
    );
}
