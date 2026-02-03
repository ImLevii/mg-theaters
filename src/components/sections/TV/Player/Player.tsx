import { siteConfig } from "@/config/site";
import { cn, triggerFullscreen } from "@/utils/helpers";
import { getTvShowPlayers } from "@/utils/players";
import { Card, Skeleton } from "@heroui/react";
import { useDisclosure, useDocumentTitle, useIdle } from "@mantine/hooks";
import dynamic from "next/dynamic";
import { parseAsInteger, useQueryState } from "nuqs";
import React, { memo, useMemo, useState } from "react";
import { Episode, TvShowDetails } from "tmdb-ts";
import useIsMobile from "@/hooks/useIsMobile";
import { SpacingClasses } from "@/utils/constants";
import { usePlayerEvents } from "@/hooks/usePlayerEvents";

const TvShowPlayerHeader = dynamic(() => import("./Header"));
const TvShowPlayerSourceSelection = dynamic(() => import("./SourceSelection"));
const TvShowPlayerEpisodeSelection = dynamic(() => import("./EpisodeSelection"));
const MobilePlayer = dynamic(() => import("@/components/player/MobilePlayer"), {
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
  const [mobilePlayerFailed, setMobilePlayerFailed] = useState(false);
  const [isPlayingLocal, setIsPlayingLocal] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mobileVideoRef = React.useRef<HTMLVideoElement>(null);

  const players = getTvShowPlayers(id, episode.season_number, episode.episode_number, startAt);
  const idle = useIdle(3000);
  const [sourceOpened, sourceHandlers] = useDisclosure(false);
  const [episodeOpened, episodeHandlers] = useDisclosure(false);
  const [selectedSource, setSelectedSource] = useQueryState<number>(
    "src",
    parseAsInteger.withDefault(0),
  );

  usePlayerEvents({
    saveHistory: true,
    metadata: { season: episode.season_number, episode: episode.episode_number },
  });
  useDocumentTitle(
    `Play ${props.seriesName} - ${props.seasonName} - ${episode.name} | ${siteConfig.name}`,
  );

  const PLAYER = useMemo(() => players[selectedSource] || players[0], [players, selectedSource]);

  const handleMobileError = () => {
    console.warn("Mobile player failed to load stream, falling back to iframe.");
    setMobilePlayerFailed(true);
  };

  const handlePlay = () => {
    setIsPlayingLocal(true);

    // iOS specific: Try to trigger fullscreen on the video element directly if possible
    if (mobile) {
      setTimeout(() => {
        if (mobileVideoRef.current) {
          const video = mobileVideoRef.current;
          if ((video as any).webkitEnterFullscreen) {
            (video as any).webkitEnterFullscreen();
          } else if (video.requestFullscreen) {
            video.requestFullscreen();
          }
        } else if (containerRef.current) {
          triggerFullscreen(containerRef.current);
        }
      }, 0);
    }
  };

  return (
    <>
      <div className={cn("relative", SpacingClasses.reset)}>
        <TvShowPlayerHeader
          id={id}
          episode={episode}
          hidden={idle && !mobile}
          selectedSource={selectedSource}
          onOpenSource={sourceHandlers.open}
          onOpenEpisode={episodeHandlers.open}
          {...props}
        />

        <Card shadow="none" radius="none" className="relative h-[100dvh] w-full border-none overflow-hidden" ref={containerRef}>
          {mobile && !mobilePlayerFailed ? (
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
              <MobilePlayer
                ref={mobileVideoRef}
                id={id}
                type="tv"
                season={episode.season_number}
                episode={episode.episode_number}
                title={`${props.seriesName} - ${episode.name}`}
                poster={`https://image.tmdb.org/t/p/original${episode.still_path || tv.backdrop_path}`}
                onEnded={() => {
                  if (props.nextEpisodeNumber) {
                    window.location.href = `/tv/${id}/${episode.season_number}/${props.nextEpisodeNumber}/player?src=${selectedSource}`;
                  }
                }}
                onError={handleMobileError}
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
