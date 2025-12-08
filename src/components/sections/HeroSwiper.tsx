"use client";

import { siteConfig } from "@/config/site";
import { getImageUrl, mutateMovieTitle } from "@/utils/movies";
import { Button, Chip, Image, Link, Skeleton } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import NeonButton from "@/components/ui/button/NeonButton";
import MoviePosterCard from "@/components/sections/Movie/Cards/Poster";
import Rating from "@/components/ui/other/Rating";

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
        <div className="relative h-[85vh] w-full group">
            <Swiper
                spaceBetween={0}
                effect={"fade"}
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
                modules={[Autoplay, EffectFade, Navigation, Pagination]}
                className="h-full w-full"
            >
                {movies?.map((movie) => {
                    const title = mutateMovieTitle(movie);
                    const backdrop = getImageUrl(movie.backdrop_path, "backdrop", true);
                    const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A";

                    return (
                        <SwiperSlide key={movie.id} className="relative h-full w-full">
                            {/* Background Image */}
                            {/* Background Image with Cinematic Vignette */}
                            <div className="absolute inset-0 select-none">
                                <Image
                                    src={backdrop}
                                    alt={title}
                                    removeWrapper
                                    className="h-full w-full object-cover opacity-70"
                                    radius="none"
                                />
                                {/* Enhanced Gradients */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
                            </div>

                            {/* Content Container */}
                            <div className="relative z-10 container mx-auto flex h-full items-center px-4 md:px-8">
                                <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-12 items-center">

                                    {/* Left Content: Info */}
                                    <div className="order-2 flex flex-col items-start gap-6 md:order-1 md:col-span-8 lg:col-span-7">

                                        {/* Genre/Tags Placeholders with Animations */}
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 }}
                                            className="flex gap-3"
                                        >
                                            <Chip variant="flat" size="sm" className="bg-neon-red/10 text-neon-red border border-neon-red/20 shadow-[0_0_10px_rgba(255,0,60,0.2)] backdrop-blur-md">
                                                TOP RATED
                                            </Chip>
                                            <Chip variant="flat" size="sm" className="bg-white/10 text-white backdrop-blur-md border border-white/20">
                                                TRENDING NOW
                                            </Chip>
                                        </motion.div>

                                        {/* Cinematic Title */}
                                        <motion.h1
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="text-5xl font-black uppercase text-white md:text-7xl lg:text-8xl line-clamp-2 leading-[0.9] tracking-tighter drop-shadow-[0_0_15px_rgba(255,0,60,0.4)]"
                                        >
                                            {title}
                                        </motion.h1>

                                        {/* Metadata Row */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                            className="flex flex-wrap items-center gap-6 text-base font-semibold text-gray-200"
                                        >
                                            <Rating rate={movie.vote_average} />
                                            <div className="h-1 w-1 rounded-full bg-gray-500" />
                                            <span className="flex items-center gap-2">
                                                <Icon icon="solar:calendar-linear" className="text-neon-red" width={18} />
                                                {releaseYear}
                                            </span>
                                            {movie.adult && (
                                                <>
                                                    <div className="h-1 w-1 rounded-full bg-gray-500" />
                                                    <Chip color="danger" size="sm" variant="flat" className="border border-danger/20">18+</Chip>
                                                </>
                                            )}
                                        </motion.div>

                                        {/* Overview with improved readability */}
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            transition={{ delay: 0.4 }}
                                            className="line-clamp-3 max-w-2xl text-lg text-gray-300 md:text-xl font-medium leading-relaxed drop-shadow-md"
                                        >
                                            {movie.overview}
                                        </motion.p>

                                        {/* Actions */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 }}
                                            className="mt-6 flex flex-wrap gap-4"
                                        >
                                            <Link href={`/movie/${movie.id}`}>
                                                <NeonButton variant="red" className="min-w-[160px] py-4 px-8 text-lg hover:scale-105 active:scale-95">
                                                    <Icon icon="solar:play-bold" width={24} />
                                                    Watch Now
                                                </NeonButton>
                                            </Link>
                                            <Link href={`/movie/${movie.id}`}>
                                                <Button
                                                    variant="bordered"
                                                    size="lg"
                                                    className="h-[52px] min-w-[160px] border-white/20 bg-white/5 text-white backdrop-blur-xl hover:bg-white/10 hover:border-white/40 font-semibold text-lg hover:scale-105 active:scale-95 transition-all"
                                                    startContent={<Icon icon="solar:info-circle-linear" width={24} />}
                                                >
                                                    More Info
                                                </Button>
                                            </Link>
                                        </motion.div>
                                    </div>

                                    {/* Right Content: Poster Card with 3D effect */}
                                    <div className="hidden order-1 md:order-2 md:col-span-4 md:flex lg:col-span-5 justify-center md:justify-end">
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
                                            whileInView={{ opacity: 1, scale: 1, rotateY: -10 }}
                                            transition={{ delay: 0.4, type: "spring" }}
                                            className="relative w-[300px] lg:w-[360px] aspect-[2/3] transform hover:rotate-0 transition-transform duration-700 perspective-1000 group-hover:scale-[1.02]"
                                        >
                                            <div className="absolute inset-0 bg-neon-red/20 blur-3xl -z-10 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-700" />
                                            <MoviePosterCard movie={movie} variant="hero" />
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
                        background: #ff003c; /* Neon Red */
                         box-shadow: 0 0 10px #ff003c, 0 0 20px #ff003c;
                        width: 24px;
                        border-radius: 4px;
                    }
                `}</style>

            </Swiper>
        </div>
    );
};

export default HeroSwiper;
