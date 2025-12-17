"use client";

import { Suspense, use } from "react";
import { Spinner } from "@heroui/spinner";
import { useQuery } from "@tanstack/react-query";
import { tmdb } from "@/api/tmdb";
import { Cast } from "tmdb-ts/dist/types/credits";
import { notFound } from "next/navigation";
import { Image } from "tmdb-ts";
import dynamic from "next/dynamic";
import { Params } from "@/types";
import { NextPage } from "next";
const PhotosSection = dynamic(() => import("@/components/ui/other/PhotosSection"));
const BackdropSection = dynamic(() => import("@/components/sections/Movie/Detail/Backdrop"));
const MoviePlayer = dynamic(() => import("@/components/sections/Movie/Player/Player"));
const OverviewSection = dynamic(() => import("@/components/sections/Movie/Detail/Overview"));
const CastsSection = dynamic(() => import("@/components/sections/Movie/Detail/Casts"));
const RelatedSection = dynamic(() => import("@/components/sections/Movie/Detail/Related"));

import { getMovieLastPosition } from "@/actions/histories";

const MovieDetailPage: NextPage<Params<{ id: number }>> = ({ params }) => {
  const { id } = use(params);

  const {
    data: movie,
    isPending,
    error,
  } = useQuery({
    queryFn: () =>
      tmdb.movies.details(id, [
        "images",
        "videos",
        "credits",
        "keywords",
        "recommendations",
        "similar",
        "reviews",
        "watch/providers",
      ]),
    queryKey: ["movie-detail", id],
  });

  const { data: startAt } = useQuery({
    queryFn: () => getMovieLastPosition(id),
    queryKey: ["movie-player-start-at", id],
  });

  if (isPending) {
    return <Spinner size="lg" className="absolute-center" variant="simple" />;
  }

  if (error) notFound();

  return (
    <div className="relative w-full -mt-24">
      <BackdropSection movie={movie} />
      {/* <div id="movie-player-container" className="pt-10 w-full max-w-[1400px] mx-auto px-4">
        <MoviePlayer movie={movie!} startAt={startAt} />
      </div> */}
      <Suspense fallback={<Spinner size="lg" className="absolute-center" variant="simple" />}>
        <div className="mx-auto w-full max-w-[1400px] flex flex-col gap-10">
          <OverviewSection movie={movie!} startAt={startAt} />
          <CastsSection casts={movie!.credits.cast as Cast[]} />
          <PhotosSection images={movie!.images.backdrops as Image[]} />
          <RelatedSection movie={movie!} />
        </div>
      </Suspense>
    </div>
  );
};

export default MovieDetailPage;
