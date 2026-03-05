import { siteConfig } from "@/config/site";
import { cn, triggerFullscreen } from "@/utils/helpers";
import { getTvShowPlayers } from "@/utils/players";
import { Card, Skeleton } from "@heroui/react";
import { useDisclosure, useDocumentTitle, useIdle } from "@mantine/hooks";
import dynamic from "next/dynamic";
import { parseAsBoolean, parseAsInteger, useQueryState } from "nuqs";
import React, { memo, useMemo, useState } from "react";
import { Episode, TvShowDetails } from "tmdb-ts";
import useIsMobile from "@/hooks/useIsMobile";
import { SpacingClasses } from "@/utils/constants";
import { usePlayerEvents } from "@/hooks/usePlayerEvents";
import { usePlayerStore } from "@/hooks/usePlayerStore";

const TvShowPlayerHeader = dynamic(() => import("./Header"));
const TvShowPlayerSourceSelection = dynamic(() => import("./SourceSelection"));
const TvShowPlayerEpisodeSelection = dynamic(() => import("./EpisodeSelection"));
const NativePlayer = dynamic(() => import("@/components/player/NativePlayer"), {
  ssr: false,
});
const MoviePlayerHero = dynamic(() => import("../../Movie/Player/PlayerHero"));

export interface TvShowPlayerProps {
  tv: TvShowDetails;
  id: number;
  seriesName: string;
  seasonName: string;
  episode: Episode;
  episodes: Episode[];
  nextEpisodeNumber: number | null;
  prevEpisodeNumber: number | null;
  startAt?: number;
}

const TvShowPlayer: React.FC<TvShowPlayerProps> = ({
  tv,
  id,
  episode,
  episodes,
  startAt,
  ...props
}) => {
  const mobile = useIsMobile();
  const [nativePlayerFailed, setNativePlayerFailed] = useState(false);
  const [isPlayingLocal, setIsPlayingLocal] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mobileVideoRef = React.useRef<HTMLVideoElement>(null);
  const { autoPlay: isAutoPlay } = usePlayerStore();

  const players = getTvShowPlayers(id, episode.season_number, episode.episode_number, startAt);
  const idle = useIdle(3000);
  const [sourceOpened, sourceHandlers] = useDisclosure(false);
  const [episodeOpened, episodeHandlers] = useDisclosure(false);
  const [selectedSource, setSelectedSource] = useQueryState<number>(
    "src",
    parseAsInteger.withDefault(0),
  );
  const [autoPlayQuery] = useQueryState(
    "autoplay",
    parseAsBoolean.withDefault(false),
  );

  // Default to VidSrc 2 (index 7) or SuperEmbed (index 3) on mobile if no source is selected
  React.useEffect(() => {
    if (mobile && selectedSource === 0) {
      setSelectedSource(7); // VidSrc 2
    }
  }, [mobile, selectedSource, setSelectedSource]);

  usePlayerEvents({
    saveHistory: true,
    metadata: { season: episode.season_number, episode: episode.episode_number },
  });
  useDocumentTitle(
    `Play ${props.seriesName} - ${props.seasonName} - ${episode.name} | ${siteConfig.name}`,
  );

  const PLAYER = useMemo(() => players[selectedSource] || players[0], [players, selectedSource]);

  const handleNativeError = () => {
    console.warn("Native player failed to load stream, falling back to iframe.");
    setNativePlayerFailed(true);
  };

  React.useEffect(() => {
    if (autoPlayQuery) {
      setIsPlayingLocal(true);
    }
  }, [autoPlayQuery]);

  const handlePlay = React.useCallback(() => {
    console.log("[TvShowPlayer] handlePlay initiated. mobile:", mobile);
    setIsPlayingLocal(true);

    // Give the dynamic component time to mount and the ref to attach
    setTimeout(() => {
      if (mobileVideoRef.current) {
        const video = mobileVideoRef.current;
        console.log("[TvShowPlayer] Executing force play trigger...");
        
        video.play()
          .then(() => console.log("[TvShowPlayer] Force play successful"))
          .catch(err => console.error("[TvShowPlayer] Force play failed or blocked:", err));

        if (mobile) {
          if ((video as any).webkitEnterFullscreen) {
            (video as any).webkitEnterFullscreen();
          } else if (video.requestFullscreen) {
            video.requestFullscreen();
          }
        }
      } else {
        console.warn("[TvShowPlayer] mobileVideoRef is null during handlePlay timeout");
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
      <div className={cn("relative", SpacingClasses.reset)}>
        <TvShowPlayerHeader
          id={id}
          episode={episode}
          hidden={(idle && !mobile) || !isPlayingLocal}
          selectedSource={selectedSource}
          onOpenSource={sourceHandlers.open}
          onOpenEpisode={episodeHandlers.open}
          {...props}
        />

        <Card shadow="none" radius="none" className="relative h-[calc(100dvh-env(safe-area-inset-top)-env(safe-area-inset-bottom))] w-full border-none overflow-hidden" ref={containerRef}>
          {(mobile || isNativeSource) && !nativePlayerFailed ? (
            <div className="relative h-full w-full">
              {!isPlayingLocal && (
                <div className="absolute inset-0 z-20">
                  <MoviePlayerHero
                    movie={{
                      id: id,
                      title: `${props.seriesName} - ${episode.name}`,
                      backdrop_path: episode.still_path || tv.backdrop_path,
                    } as any}
                    onPlay={handlePlay}
                    minimal={true}
                  />
                </div>
              )}
              <NativePlayer
                ref={mobileVideoRef}
                id={id}
                type="tv"
                season={episode.season_number}
                episode={episode.episode_number}
                title={`${props.seriesName} - ${episode.name}`}
                poster={`https://image.tmdb.org/t/p/original${episode.still_path || tv.backdrop_path}`}
                onEnded={() => {
                  console.log("[TvShowPlayer] NativePlayer signaled onEnded. isAutoPlay:", isAutoPlay, "next:", props.nextEpisodeNumber);
                  if (isAutoPlay && props.nextEpisodeNumber) {
                    const nextUrl = `/tv/${id}/${episode.season_number}/${props.nextEpisodeNumber}/player?src=${selectedSource}&autoplay=true`;
                    console.log("[TvShowPlayer] Auto-playing next episode:", nextUrl);
                    window.location.href = nextUrl;
                  }
                }}
                onError={handleNativeError}
              />
            </div>
          ) : (
            <>
              {!isPlayingLocal && (
                <div className="absolute inset-0 z-20">
                  <MoviePlayerHero
                    movie={{
                      id: id,
                      title: `${props.seriesName} - ${episode.name}`,
                      backdrop_path: episode.still_path || tv.backdrop_path,
                    } as any}
                    onPlay={handlePlay}
                    minimal={true}
                  />
                </div>
              )}
              <Skeleton className="absolute h-full w-full" />
              <iframe
                allowFullScreen
                key={PLAYER.title}
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                src={PLAYER.source}
                className={cn("z-10 h-full w-full border-none", {
                  "pointer-events-none": idle && !mobile,
                })}
              />
            </>
          )}
        </Card>
      </div>

      <TvShowPlayerSourceSelection
        opened={sourceOpened}
        onClose={sourceHandlers.close}
        players={players}
        selectedSource={selectedSource}
        setSelectedSource={setSelectedSource}
      />
      <TvShowPlayerEpisodeSelection
        id={id}
        opened={episodeOpened}
        onClose={episodeHandlers.close}
        episodes={episodes}
      />
    </>
  );
};

export default memo(TvShowPlayer);
