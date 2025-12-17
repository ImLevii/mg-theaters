import { siteConfig } from "@/config/site";
import { cn } from "@/utils/helpers";
import { Button } from "@heroui/react";
import { Play } from "lucide-react";
import NeonButton from "@/components/ui/button/NeonButton";
import { AnimatedPlayIcon } from "@/components/icons/AnimatedIcons";
import { motion } from "framer-motion";
import Image from "next/image";
import { MovieDetails } from "tmdb-ts/dist/types/movies";

interface PlayerHeroProps {
    movie: MovieDetails;
    onPlay: () => void;
    minimal?: boolean;
}

const PlayerHero: React.FC<PlayerHeroProps> = ({ movie, onPlay, minimal = false }) => {
    const backdropUrl = movie.backdrop_path
        ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
        : null;

    return (
        <div className="relative h-full w-full overflow-hidden bg-black">
            {/* Background Image */}
            {backdropUrl && (
                <div className="absolute inset-0">
                    <Image
                        src={backdropUrl}
                        alt={movie.title || "Movie Backdrop"}
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
                </div>
            )}

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    {/* Movie Title */}
                    {!minimal && (
                        <h1 className="mb-2 text-4xl font-bold text-white md:text-6xl drop-shadow-2xl">
                            {movie.title}
                        </h1>
                    )}

                    {/* Tagline or release year (optional, cosmetic) */}
                    {!minimal && movie.tagline && (
                        <p className="mb-8 text-lg text-white/80 italic max-w-2xl mx-auto drop-shadow-md">
                            "{movie.tagline}"
                        </p>
                    )}

                    {/* Play Button */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-block"
                    >
                        <NeonButton
                            variant="green"
                            onClick={onPlay}
                            className="min-w-[160px] py-4 px-8 text-lg"
                            icon={<AnimatedPlayIcon />}
                        >
                            CLICK TO PLAY
                        </NeonButton>
                    </motion.div>

                </motion.div>
            </div>

            {/* Decorative Bottom Gradient for seamless integration if needed */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
        </div>
    );
};

export default PlayerHero;
