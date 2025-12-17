import { SpacingClasses } from "@/utils/constants";
import { siteConfig } from "@/config/site";
import useBreakpoints from "@/hooks/useBreakpoints";
import { cn } from "@/utils/helpers";
import { mutateMovieTitle } from "@/utils/movies";
import { getMoviePlayers } from "@/utils/players";
import { Card, Skeleton } from "@heroui/react";
import { useDisclosure, useDocumentTitle, useIdle } from "@mantine/hooks";
import dynamic from "next/dynamic";
import { parseAsInteger, useQueryState } from "nuqs";
import React, { useMemo } from "react";
import { MovieDetails } from "tmdb-ts/dist/types/movies";
import { usePlayerEvents } from "@/hooks/usePlayerEvents";

const MoviePlayerHeader = dynamic(() => import("./Header"));
const MoviePlayerSourceSelection = dynamic(() => import("./SourceSelection"));
const MoviePlayerHero = dynamic(() => import("./PlayerHero"));

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
  const { mobile } = useBreakpoints();
  const [opened, handlers] = useDisclosure(false);
  const [selectedSource, setSelectedSource] = useQueryState<number>(
    "src",
    parseAsInteger.withDefault(0),
  );

  usePlayerEvents({ saveHistory: true });
  useDocumentTitle(`Play ${title} | ${siteConfig.name}`);

  // ACTUAL STATE
  const [isPlayingLocal, setIsPlayingLocal] = React.useState(false);

  React.useEffect(() => {
    if (autoPlay) {
      setIsPlayingLocal(true);
    }
  }, [autoPlay]);

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

  const handlePlay = () => {
    setIsPlayingLocal(true);
  };

  return (
    <>
      <div className="relative w-full bg-black aspect-video">
        <MoviePlayerHeader
          id={movie.id}
          movieName={title}
          onOpenSource={handlers.open}
          hidden={(idle && !mobile) || !isPlayingLocal}
          minimal={minimal}
        />
        <Card shadow="none" radius="none" className="relative h-full w-full border-none bg-black">
          {!isPlayingLocal ? (
            <MoviePlayerHero movie={movie} onPlay={handlePlay} minimal={minimal} />
          ) : (
            <>
              <Skeleton className="absolute h-full w-full" />
              <iframe
                allowFullScreen
                key={PLAYER.title}
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                src={playerSource}
                className={cn("z-10 h-full w-full border-none", { "pointer-events-none": idle && !mobile })}
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
