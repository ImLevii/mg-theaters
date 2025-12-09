"use client";

import { siteConfig } from "@/config/site";
import TMDBLogo from "@/components/ui/image/TMDBLogo";
import { cn } from "@/utils/helpers";
import { getImageUrl, mutateMovieTitle } from "@/utils/movies";
import { Button, Chip, Image, Link, Skeleton } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import NeonButton from "@/components/ui/button/NeonButton";
import MoviePosterCard from "@/components/sections/Movie/Cards/Poster";
import Rating from "@/components/ui/other/Rating";
import { AnimatedPlayIcon, AnimatedInfoIcon, AnimatedTrendingIcon } from "@/components/icons/AnimatedIcons";

const HeroSwiper = () => {
    const { data, isPending } = useQuery({
        queryFn: siteConfig.queryLists.movies[0].query, // Today's Trending Movies
        queryKey: ["hero-trending-movies"],
    });

    const movies = data?.results.slice(0, 10); // Limit to top 10

    if (isPending) {
        return (
            <div className="relative h-[80vh] w-full overflow-hidden">
                <Skeleton className="h-full w-full" />
            </div>
        );
    }

    return (
        <div className={cn("relative h-[500px] md:h-[707px] w-auto md:w-[1250px] max-w-full overflow-hidden group rounded-3xl shadow-2xl shadow-black/50 mx-4 md:mx-auto bg-black")}>
            <Swiper
                spaceBetween={0}
                effect={"fade"}
                grabCursor={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true,
                }}
                modules={[Autoplay, Navigation, Pagination, EffectFade]}
                className="h-full w-full"
            >
                {movies?.map((movie) => {
                    const title = mutateMovieTitle(movie);
                    const backdrop = getImageUrl(movie.backdrop_path, "backdrop", true);
                    const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A";

                    return (
                        <SwiperSlide key={movie.id} className="relative h-full w-full">
                            {/* Background Image */}
                            <div className="absolute inset-0 select-none">
                                <Image
                                    src={backdrop}
                                    alt={title}
                                    removeWrapper
                                    className="h-full w-full object-cover opacity-70 blur-[2px] scale-110"
                                    radius="none"
                                />
                                {/* Enhanced Gradients */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-black/60 to-transparent" />
                                <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-black/85 via-45% to-transparent" />
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)]" />
                            </div>

                            {/* Heart Icon */}
                            <div className="absolute top-6 right-6 z-20">
                                <Button isIconOnly radius="full" variant="light" className="text-white hover:text-red-500">
                                    <Icon icon="solar:heart-linear" className="text-2xl" />
                                </Button>
                            </div>

                            {/* Content Container */}
                            <div className="relative z-10 container mx-auto flex h-full items-center px-4 md:px-8">
                                <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-12 items-center">
                                    {/* Center Content: Info */}
                                    <div className="order-2 flex flex-col items-center justify-center gap-4 md:gap-6 col-span-1 md:col-span-12 lg:col-span-8 lg:col-start-3 text-center pt-8 md:pt-0">

                                        {/* Trending Pill (Neon Button) */}
                                        <motion.div
                                            initial={{ opacity: 0, y: -20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 }}
                                        >
                                            <NeonButton
                                                variant="orange"
                                                className="px-5 py-2 md:px-6 md:py-2 pointer-events-none text-xs md:text-sm border-orange-500/30"
                                                icon={<AnimatedTrendingIcon />}
                                            >
                                                Trending Now
                                            </NeonButton>
                                        </motion.div>


                                        {/* Cinematic Title / Logo */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="w-full flex justify-center"
                                        >
                                            <TMDBLogo movieId={movie.id} title={title} className="max-w-[70%] md:max-w-[70%]" />
                                        </motion.div>

                                        {/* Metadata Row */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                            className="flex flex-wrap justify-center items-center gap-3 md:gap-6 text-xs md:text-lg font-medium text-gray-200 tracking-wider"
                                        >
                                            <div className="flex items-center gap-1.5 md:gap-2">
                                                <Icon icon="solar:calendar-bold" className="text-white" />
                                                {releaseYear}
                                            </div>
                                            <div className="flex items-center gap-1.5 md:gap-2">
                                                <Icon icon="solar:star-bold" className="text-yellow-400" />
                                                <span>{movie.vote_average?.toFixed(1)}/10</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 md:gap-2">
                                                <Icon icon="solar:tag-bold" className="text-white" />
                                                <span>Drama</span>
                                            </div>
                                        </motion.div>

                                        {/* Overview with improved readability */}
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            transition={{ delay: 0.4 }}
                                            className="line-clamp-3 max-w-3xl text-sm md:text-xl text-gray-100 leading-relaxed tracking-wide drop-shadow-md font-light px-4 md:px-0"
                                        >
                                            {movie.overview}
                                        </motion.p>

                                        {/* Actions */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 }}
                                            className="mt-6 md:mt-8 flex items-center justify-center gap-4 md:gap-8 pb-8 md:pb-0"
                                        >
                                            <Link href={`/movie/${movie.id}`}>
                                                <NeonButton variant="green" solid={false} className="min-w-[140px] md:min-w-[160px] py-3.5 px-6 md:py-4 md:px-8 text-sm md:text-lg hover:scale-105 active:scale-95" icon={<AnimatedPlayIcon />}>
                                                    Watch Now
                                                </NeonButton>
                                            </Link>
                                            <Link href={`/movie/${movie.id}`}>
                                                <NeonButton variant="green" solid={false} className="min-w-[140px] md:min-w-[160px] py-3.5 px-6 md:py-4 md:px-8 text-sm md:text-lg hover:scale-105 active:scale-95" icon={<AnimatedInfoIcon />}>
                                                    More Info
                                                </NeonButton>
                                            </Link>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                })}

                <div className="swiper-button-prev !text-white/50 hover:!text-neon-red transition-colors !hidden md:!flex after:!text-2xl" />
                <div className="swiper-button-next !text-white/50 hover:!text-neon-red transition-colors !hidden md:!flex after:!text-2xl" />

                {/* Custom Pagination Styles */}
                <style jsx global>{`
                    .swiper-pagination-bullet {
                        background: white;
                        opacity: 0.3;
                        transition: all 0.3s ease;
                    }
                    .swiper-pagination-bullet-active {
                        opacity: 1;
                        background: white;
                        box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
                        width: 24px;
                        border-radius: 4px;
                    }
                `}</style>
            </Swiper>
        </div>
    );
};

export default HeroSwiper;
