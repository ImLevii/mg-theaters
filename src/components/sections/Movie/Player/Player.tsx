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
const NativePlayer = dynamic(() => import("@/components/player/NativePlayer"), {
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
  const [nativePlayerFailed, setNativePlayerFailed] = React.useState(false);
  const router = useRouter();
  const mobile = useIsMobile();
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mobileVideoRef = React.useRef<HTMLVideoElement>(null);

  // Default to VidSrc 2 (index 7) or SuperEmbed (index 3) on mobile if no source is selected
  // CRITICAL: Disable override if autoplay is active to maintain NativePlayer support
  React.useEffect(() => {
    if (mobile && selectedSource === 0 && !autoPlayQuery) {
      console.log("[MoviePlayer] Auto-switching to VidSrc 2 on mobile (no autoplay)");
      setSelectedSource(7); // VidSrc 2
    } else if (mobile && selectedSource === 0 && autoPlayQuery) {
      console.log("[MoviePlayer] Maintaining NativePlayer for mobile auto-play");
    }
  }, [mobile, selectedSource, setSelectedSource, autoPlayQuery]);

  const { autoPlay: isAutoPlay } = usePlayerStore();

  const handleNativeEnded = async () => {
    console.log("[MoviePlayer] NativePlayer signaled onEnded. isAutoPlay:", isAutoPlay);
    if (!isAutoPlay) return;
    try {
      const res = await fetch("/api/movies/random");
      const data = await res.json();
      if (data.id) {
        const nextUrl = `/movie/${data.id}?autoplay=true`;
        console.log("[MoviePlayer] Auto-playing random movie:", nextUrl);
        router.push(nextUrl);
      }
    } catch (err) {
      console.error("Failed to autoplay random movie", err);
    }
  };

  const handleNativeError = () => {
    console.warn("Native player failed to load stream, falling back to iframe.");
    setNativePlayerFailed(true);
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
    console.log("[MoviePlayer] handlePlay initiated. mobile:", mobile);
    setIsPlayingLocal(true);

    setTimeout(() => {
      if (mobileVideoRef.current) {
        const video = mobileVideoRef.current;
        console.log("[MoviePlayer] Executing force play trigger...");

        video.play()
          .then(() => console.log("[MoviePlayer] Force play successful"))
          .catch(err => console.error("[MoviePlayer] Force play failed or blocked:", err));
        
        if (mobile) {
          if ((video as any).webkitEnterFullscreen) {
            (video as any).webkitEnterFullscreen();
          } else if (video.requestFullscreen) {
            video.requestFullscreen();
          }
        }
      } else {
        console.warn("[MoviePlayer] mobileVideoRef is null during handlePlay timeout");
        if (containerRef.current && mobile) {
          triggerFullscreen(containerRef.current);
        }
      }
    }, 800);
  }, [mobile]);

  // Handle autoplay query param with force play
  React.useEffect(() => {
    if (autoPlayQuery && !isPlayingLocal) {
      handlePlay();
    }
  }, [autoPlayQuery, isPlayingLocal, handlePlay]);

  const isNativeSource = selectedSource === 0 || selectedSource === 1;

  return (
    <>
      <div className="relative w-full bg-black aspect-video min-h-[200px] sm:min-h-[280px] md:min-h-0">
        <MoviePlayerHeader
          id={movie.id}
          movieName={title}
          onOpenSource={handlers.open}
          hidden={(idle && !mobile) || !isPlayingLocal}
          minimal={minimal}
        />
        <Card shadow="none" radius="none" className="relative h-full w-full border-none bg-black overflow-hidden" ref={containerRef}>
          {(mobile || isNativeSource) && !nativePlayerFailed ? (
            <div className="relative h-full w-full">
              {!isPlayingLocal && (
                <div className="absolute inset-0 z-20">
                  <MoviePlayerHero movie={movie} onPlay={handlePlay} minimal={minimal} />
                </div>
              )}
              <NativePlayer
                ref={mobileVideoRef}
                id={movie.id}
                type="movie"
                title={title}
                poster={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                onEnded={handleNativeEnded}
                onError={handleNativeError}
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
