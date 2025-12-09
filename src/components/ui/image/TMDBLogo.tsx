"use client";

import { cn } from "@/utils/helpers";
import { getImageUrl } from "@/utils/movies";
import { Image } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

const token = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN;

interface TMDBLogoProps {
    movieId: number;
    title: string;
    className?: string;
}

const TMDBLogo = ({ movieId, title, className }: TMDBLogoProps) => {
    const { data: images } = useQuery({
        queryKey: ["movie-images", movieId],
        queryFn: async () => {
            // Debug log
            // console.log("[TMDBLogo] Fetching for", movieId);

            if (!token) {
                console.warn("[TMDBLogo] Token is missing!");
                return null;
            }

            try {
                const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/images?include_image_language=en,null`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!res.ok) {
                    console.warn(`[TMDBLogo] Fetch failed for ${movieId}: ${res.status}`);
                    throw new Error("Failed");
                }

                const data = await res.json();
                // console.log("[TMDBLogo] Data:", data);
                return data;
            } catch (e) {
                console.error("[TMDBLogo] Error:", e);
                return null;
            }
        },
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
        enabled: !!movieId && !!token,
    });

    const logoPath = images?.logos?.[0]?.file_path;

    if (logoPath) {
        return (
            <div className={cn("relative h-24 sm:h-32 md:h-40 w-full flex justify-center items-center mb-6", className)}>
                <Image
                    src={getImageUrl(logoPath, "poster", true)} // Use 'original' (true) or 'w500' (false)
                    alt={title}
                    className="h-full w-auto object-contain drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]"
                    radius="none"
                    removeWrapper
                />
            </div>
        );
    }

    return (
        <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={cn(
                "text-4xl sm:text-6xl font-black uppercase text-white md:text-8xl line-clamp-2 leading-none tracking-tighter drop-shadow-[0_5px_5px_rgba(0,0,0,1)]",
                className
            )}
            style={{ textShadow: "0 0 30px rgba(255,255,255,0.1)" }}
        >
            {title}
        </motion.h1>
    );
};

export default TMDBLogo;
