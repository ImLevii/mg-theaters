"use client";

import { Image, Chip } from "@heroui/react";
import React, { useState } from "react";
import { getImageUrl, movieDurationString, mutateMovieTitle } from "@/utils/movies";
import BookmarkButton from "@/components/ui/button/BookmarkButton";
import { MovieDetails } from "tmdb-ts/dist/types/movies";
import Rating from "../../../ui/other/Rating";
import ShareButton from "@/components/ui/button/ShareButton";
import { AppendToResponse } from "tmdb-ts/dist/types/options";
import { useDocumentTitle } from "@mantine/hooks";
import { siteConfig } from "@/config/site";
import { FaPlay, FaYoutube } from "react-icons/fa6";
import Genres from "@/components/ui/other/Genres";
import SectionTitle from "@/components/ui/other/SectionTitle";
import Trailer from "@/components/ui/overlay/Trailer";
import { Calendar, Clock } from "@/utils/icons";
import { SavedMovieDetails } from "@/types/movie";
import NeonButton from "@/components/ui/button/NeonButton";
import PlayerModal from "@/components/sections/Movie/Player/PlayerModal";
import Link from "next/link";
import dynamic from "next/dynamic";
const MoviePlayer = dynamic(() => import("@/components/sections/Movie/Player/Player"));

interface OverviewSectionProps {
  movie: AppendToResponse<MovieDetails, "videos"[], "movie">;
  startAt?: number;
}

const OverviewSection: React.FC<OverviewSectionProps> = ({ movie, startAt }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const releaseYear = new Date(movie.release_date).getFullYear();
  const posterImage = getImageUrl(movie.poster_path);
  const title = mutateMovieTitle(movie);
  const fullTitle = title;
  const bookmarkData: SavedMovieDetails = {
    type: "movie",
    adult: movie.adult,
    backdrop_path: movie.backdrop_path,
    id: movie.id,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    title: fullTitle,
    vote_average: movie.vote_average,
    saved_date: new Date().toISOString(),
  };

  useDocumentTitle(`${fullTitle} | ${siteConfig.name}`);

  const handlePlayNow = () => {
    setIsPlaying(true);
    // Optional: Scroll to player
    const playerElement = document.getElementById("embedded-movie-player");
    if (playerElement) {
      playerElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <section id="overview" className="relative z-3 flex flex-col items-center gap-8 pt-[15vh] md:pt-[30vh]">
      <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-black/80 via-black/40 via-40% to-transparent -z-10" />

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 z-10 max-w-6xl w-full px-4">
        {/* Poster Card */}
        <div className="relative shrink-0 group perspective-1000">
          <Image
            isBlurred
            shadow="lg"
            alt={fullTitle}
            classNames={{
              wrapper: "w-[180px] md:w-[260px] aspect-[2/3] rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-105 hover:rotate-y-6",
              img: "object-cover w-full h-full"
            }}
            src={posterImage}
          />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-6 text-center md:text-left flex-1 items-center md:items-start">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <Chip
                variant="shadow"
                classNames={{ base: "bg-red-500/20 border border-red-500/50", content: "font-bold text-red-500 drop-shadow-md" }}
                size="sm"
              >
                Movie
              </Chip>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white drop-shadow-2xl font-orbitron">
                {fullTitle.toUpperCase()}
              </h1>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm md:text-base text-gray-300">
              <div className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
                <Clock className="text-primary" />
                <span>{movieDurationString(movie?.runtime)}</span>
              </div>
              <div className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
                <Calendar className="text-primary" />
                <span>{releaseYear}</span>
              </div>
              <Rating rate={movie?.vote_average || 0} />
            </div>

            <div className="flex justify-center md:justify-start pt-2">
              <Genres genres={movie.genres} />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <NeonButton
              variant="green"
              onClick={handlePlayNow}
              icon={<FaPlay />}
              className="min-w-[140px]"
            >
              Play Now
            </NeonButton>

            <Trailer videos={movie.videos.results}>
              {(onOpen) => (
                <NeonButton
                  variant="youtube_red"
                  onClick={onOpen}
                  icon={<FaYoutube />}
                  className="min-w-[140px]"
                >
                  Trailer
                </NeonButton>
              )}
            </Trailer>

            <div className="flex items-center gap-2 pl-2">
              <ShareButton id={movie.id} title={title} />
              <BookmarkButton data={bookmarkData} />
            </div>
          </div>

          <div id="embedded-movie-player" className="w-full max-w-2xl mt-8 rounded-lg shadow-2xl shadow-rose-900/10 p-3 bg-white/5">
            <MoviePlayer movie={movie} startAt={startAt} minimal={true} autoPlay={isPlaying} />
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-2" />

          {/* Story */}
          <div className="flex flex-col gap-2 max-w-2xl text-center md:text-left">
            <SectionTitle>STORY LINE</SectionTitle>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base text-pretty">
              {movie.overview}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;
