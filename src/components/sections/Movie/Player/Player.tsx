import { SpacingClasses } from "@/utils/constants";
import { siteConfig } from "@/config/site";
import { cn, triggerFullscreen } from "@/utils/helpers";
import { mutateMovieTitle } from "@/utils/movies";
import { getMoviePlayers } from "@/utils/players";
import { Card, Skeleton } from "@heroui/react";
import { useDisclosure, useDocumentTitle, useIdle } from "@mantine/hooks";
import dynamic from "next/dynamic";
import { parseAsBoolean, parseAsInteger, useQueryState } from "nuqs";
import React, { useMemo } from "react";
import { MovieDetails } from "tmdb-ts/dist/types/movies";
import { usePlayerEvents } from "@/hooks/usePlayerEvents";
import { usePlayerStore } from "@/hooks/usePlayerStore";

import { useRouter } from "next/navigation";
import useIsMobile from "@/hooks/useIsMobile";

const MoviePlayerHeader = dynamic(() => import("./Header"));
const MoviePlayerSourceSelection = dynamic(() => import("./SourceSelection"));
const MoviePlayerHero = dynamic(() => import("./PlayerHero"));
const MobilePlayer = dynamic(() => import("@/components/player/MobilePlayer"), {
  ssr: false,
});

interface MoviePlayerProps {
  movie: MovieDetails;
  startAt?: number;
  minimal?: boolean;
  autoPlay?: boolean;
}

const MoviePlayer: React.FC<MoviePlayerProps> = ({ movie, startAt, minimal = false, autoPlay = false }) => {
  const players = getMoviePlayers(movie.id, startAt);
  const title = mutateMovieTitle(movie);
  const idle = useIdle(3000);
  const [opened, handlers] = useDisclosure(false);
  const [selectedSource, setSelectedSource] = useQueryState<number>(
    "src",
    parseAsInteger.withDefault(0),
  );
  const [autoPlayQuery] = useQueryState(
    "autoplay",
    parseAsBoolean.withDefault(false),
  );

  usePlayerEvents({ saveHistory: true });
  useDocumentTitle(`Play ${title} | ${siteConfig.name}`);

  // ACTUAL STATE
  const [isPlayingLocal, setIsPlayingLocal] = React.useState(false);
  const [mobilePlayerFailed, setMobilePlayerFailed] = React.useState(false);
  const router = useRouter();
  const mobile = useIsMobile();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mobileVideoRef = React.useRef<HTMLVideoElement>(null);

  // Default to VidSrc 2 (index 7) or SuperEmbed (index 3) on mobile if no source is selected
  React.useEffect(() => {
    if (mobile && selectedSource === 0) {
      setSelectedSource(7); // VidSrc 2
    }
  }, [mobile, selectedSource, setSelectedSource]);

  const { autoPlay: isAutoPlay } = usePlayerStore();

  const handleMobileEnded = async () => {
    if (!isAutoPlay) return;
    try {
      const res = await fetch("/api/movies/random");
      const data = await res.json();
      if (data.id) {
        window.location.href = `/movie/${data.id}?autoplay=true`;
      }
    } catch (err) {
      console.error("Failed to autoplay random movie", err);
    }
  };

  const handleMobileError = () => {
    console.warn("Mobile player failed to load stream, falling back to iframe.");
    setMobilePlayerFailed(true);
  };

  React.useEffect(() => {
    if (autoPlay || autoPlayQuery) {
      setIsPlayingLocal(true);
    }
  }, [autoPlay, autoPlayQuery]);

  const PLAYER = useMemo(() => players[selectedSource] || players[0], [players, selectedSource]);

  // Construct source with autoplay if needed
  const playerSource = useMemo(() => {
    let src = PLAYER.source;
    if (isPlayingLocal) {
      // Append autoplay param if not present. 
      // Note: Some players use 'autoplay', others 'autoPlay'.
      // Our utils might already have 'autoplay=false'. We need to flip it.
      if (src.includes('autoplay=false')) {
        src = src.replace('autoplay=false', 'autoplay=true') as `https://${string}`;
      } else if (src.includes('autoPlay=false')) {
        src = src.replace('autoPlay=false', 'autoPlay=true') as `https://${string}`;
      } else {
        // If no autoplay param exists, add it.
        const separator = src.includes('?') ? '&' : '?';
        src = `${src}${separator}autoplay=true` as `https://${string}`;
      }
    }
    return src as `https://${string}`;
  }, [PLAYER.source, isPlayingLocal]);

  const handlePlay = React.useCallback(() => {
    setIsPlayingLocal(true);

    // iOS specific: Try to trigger fullscreen on the video element directly if possible
    if (mobile) {
      setTimeout(() => {
        if (mobileVideoRef.current) {
          const video = mobileVideoRef.current;
          // Explicitly play for mobile
          video.play().catch(err => console.warn("Force play failed:", err));
          
          if ((video as any).webkitEnterFullscreen) {
            (video as any).webkitEnterFullscreen();
          } else if (video.requestFullscreen) {
            video.requestFullscreen();
          }
        } else if (containerRef.current) {
          triggerFullscreen(containerRef.current);
        }
      }, 100); // Small delay to ensure player is ready
    }
  }, [mobile]);

  // Handle autoplay query param with force play
  React.useEffect(() => {
    if (autoPlayQuery && !isPlayingLocal) {
      handlePlay();
    }
  }, [autoPlayQuery, isPlayingLocal, handlePlay]);

  return (
    <>
      <div className="relative w-full bg-black aspect-video min-h-[200px] sm:min-h-[280px] md:min-h-0">
        <MoviePlayerHeader
          id={movie.id}
          movieName={title}
          onOpenSource={handlers.open}
          hidden={idle || !isPlayingLocal}
          minimal={minimal}
        />
        <Card shadow="none" radius="none" className="relative h-full w-full border-none bg-black overflow-hidden" ref={containerRef}>
          {!isPlayingLocal && !mobile ? (
            <MoviePlayerHero movie={movie} onPlay={handlePlay} minimal={minimal} />
          ) : mobile && !mobilePlayerFailed ? (
            <div className="relative h-full w-full">
              {!isPlayingLocal && (
                <div className="absolute inset-0 z-20">
                  <MoviePlayerHero movie={movie} onPlay={handlePlay} minimal={minimal} />
                </div>
              )}
              <MobilePlayer
                ref={mobileVideoRef}
                id={movie.id}
                type="movie"
                title={title}
                poster={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                onEnded={handleMobileEnded}
                onError={handleMobileError}
              />
            </div>
          ) : (
            <>
              {!isPlayingLocal && (
                <div className="absolute inset-0 z-20">
                  <MoviePlayerHero movie={movie} onPlay={handlePlay} minimal={minimal} />
                </div>
              )}
              <Skeleton className="absolute h-full w-full" />
              <iframe
                allowFullScreen
                key={PLAYER.title}
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                src={playerSource}
                className="z-10 h-full w-full border-none"
              />
            </>
          )}
        </Card>
      </div>

      <MoviePlayerSourceSelection
        opened={opened}
        onClose={handlers.close}
        players={players}
        selectedSource={selectedSource}
        setSelectedSource={setSelectedSource}
      />
    </>
  );
};

MoviePlayer.displayName = "MoviePlayer";

export default MoviePlayer;
