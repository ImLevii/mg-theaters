"use client";

import { Image, Chip } from "@heroui/react";
import { getImageUrl, mutateTvShowTitle } from "@/utils/movies";
import BookmarkButton from "@/components/ui/button/BookmarkButton";
import ShareButton from "@/components/ui/button/ShareButton";
import { AppendToResponse } from "tmdb-ts/dist/types/options";
import { useDocumentTitle } from "@mantine/hooks";
import { siteConfig } from "@/config/site";
import { FaCirclePlay, FaYoutube } from "react-icons/fa6";
import Genres from "@/components/ui/other/Genres";
import { TvShowDetails } from "tmdb-ts/dist/types/tv-shows";
import { Calendar, List, Season } from "@/utils/icons";
import Rating from "@/components/ui/other/Rating";
import SectionTitle from "@/components/ui/other/SectionTitle";
import Trailer from "@/components/ui/overlay/Trailer";
import { SavedMovieDetails } from "@/types/movie";
import NeonButton from "@/components/ui/button/NeonButton";

export interface TvShowOverviewSectionProps {
  tv: AppendToResponse<TvShowDetails, "videos"[], "tvShow">;
  onViewEpisodesClick: () => void;
}

export const TvShowOverviewSection: React.FC<TvShowOverviewSectionProps> = ({
  tv,
  onViewEpisodesClick,
}) => {
  const firstReleaseYear = new Date(tv.first_air_date).getFullYear();
  const lastReleaseYear = new Date(tv.last_air_date).getFullYear();
  const releaseYears = `${firstReleaseYear} ${firstReleaseYear !== lastReleaseYear ? ` - ${lastReleaseYear}` : ""}`;
  const posterImage = getImageUrl(tv.poster_path);
  const title = mutateTvShowTitle(tv);
  const fullTitle = title;
  const bookmarkData: SavedMovieDetails = {
    type: "tv",
    adult: "adult" in tv ? (tv.adult as boolean) : false,
    backdrop_path: tv.backdrop_path,
    id: tv.id,
    poster_path: tv.poster_path,
    release_date: tv.first_air_date,
    title: fullTitle,
    vote_average: tv.vote_average,
    saved_date: new Date().toISOString(),
  };

  useDocumentTitle(`${fullTitle} | ${siteConfig.name}`);

  return (
    <section id="overview" className="relative z-3 flex flex-col items-center gap-8 pt-[15vh] md:pt-[30vh]">
      <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-black/80 via-black/40 via-40% to-transparent -z-10" />

      <div className="flex flex-col md:flex-row items-center md:items-end gap-8 md:gap-12 z-10 max-w-6xl w-full px-4">
        {/* Poster Card */}
        <div className="relative shrink-0 group perspective-1000">
          <Image
            isBlurred
            shadow="lg"
            alt={fullTitle}
            classNames={{
              wrapper: "w-[180px] md:w-[260px] aspect-[2/3] rounded-xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-105 hover:rotate-y-6 mx-auto md:mx-0",
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
                classNames={{ base: "bg-yellow-500/20 border border-yellow-500/50", content: "font-bold text-yellow-500 drop-shadow-md" }}
                size="sm"
              >
                TV Show
              </Chip>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white drop-shadow-2xl font-orbitron">
                {fullTitle.toUpperCase()}
              </h1>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm md:text-base text-gray-300">
              <div className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
                <Season className="text-primary" />
                <span>
                  {tv.number_of_seasons} Season{tv.number_of_seasons > 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
                <List className="text-primary" />
                <span>
                  {tv.number_of_episodes} Episode{tv.number_of_episodes > 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-white/10 backdrop-blur-sm">
                <Calendar className="text-primary" />
                <span>{releaseYears}</span>
              </div>
              <Rating rate={tv.vote_average} count={tv.vote_count} />
            </div>

            <div className="flex justify-center md:justify-start pt-2">
              <Genres genres={tv.genres} type="tv" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <NeonButton
              variant="orange"
              onClick={onViewEpisodesClick}
              icon={<FaCirclePlay size={18} />}
              className="min-w-[140px]"
            >
              View Episodes
            </NeonButton>

            <Trailer videos={tv.videos.results}>
              {(onOpen) => (
                <NeonButton
                  variant="pink"
                  onClick={onOpen}
                  icon={<FaYoutube />}
                  className="min-w-[140px]"
                >
                  Trailer
                </NeonButton>
              )}
            </Trailer>

            <div className="flex items-center gap-2 pl-2">
              <ShareButton id={tv.id} title={title} type="tv" />
              <BookmarkButton data={bookmarkData} />
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-2" />

          {/* Story */}
          <div className="flex flex-col gap-2 max-w-2xl text-center md:text-left">
            <SectionTitle>STORY LINE</SectionTitle>
            <p className="text-gray-300 leading-relaxed text-sm md:text-base text-pretty">
              {tv.overview}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TvShowOverviewSection;
