import { cn } from "@/utils/helpers";
import ActionButton from "./ActionButton";
import { TvShowPlayerProps } from "./Player";

interface TvShowPlayerHeaderProps extends Omit<TvShowPlayerProps, "episodes" | "tv" | "startAt"> {
  hidden?: boolean;
  selectedSource: number;
  onOpenSource: () => void;
  onOpenEpisode: () => void;
}

import { usePiPStore } from "@/hooks/usePiPStore";
import { getTvShowPlayers } from "@/utils/players";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

const TvShowPlayerHeader: React.FC<TvShowPlayerHeaderProps> = ({
  id,
  seriesName,
  seasonName,
  episode,
  hidden,
  selectedSource,
  nextEpisodeNumber,
  prevEpisodeNumber,
  onOpenSource,
  onOpenEpisode,
}) => {
  const router = useRouter();
  const { openPiP } = usePiPStore();

  const handlePiP = () => {
    const players = getTvShowPlayers(id, episode.season_number, episode.episode_number);
    const player = players[selectedSource] || players[0];
    openPiP(
      player.source,
      `${seriesName} - ${seasonName} - ${episode.name}`,
      {
        id,
        type: "tv",
        season: episode.season_number,
        episode: episode.episode_number,
      }
    );
    router.push("/");
  };

  return (
    <div
      aria-hidden={hidden ? true : undefined}
      className={cn(
        "absolute top-0 z-[60] flex w-full items-center justify-between gap-4 transition-all duration-300",
        "bg-gradient-to-b from-black/80 to-transparent p-3 md:p-6 text-white",
        hidden ? "opacity-0 pointer-events-none -translate-y-2" : "opacity-100 pointer-events-auto translate-y-0"
      )}
    >
      <div className="z-10">
        <ActionButton label="Back" href={`/tv/${id}`} variant="neon">
          <Icon icon="fa6-solid:chevron-left" className="w-5 h-5 sm:w-6 sm:h-6" />
        </ActionButton>
      </div>

      <div className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center pointer-events-none">
        <div className="hidden md:flex flex-col justify-center text-center">
          <p className="text-sm text-white/90 text-shadow-lg sm:text-lg font-orbitron font-bold tracking-widest uppercase truncate px-4">
            {seriesName}
          </p>
          <p className="text-[10px] text-gray-300 font-orbitron tracking-[0.2em] uppercase">
            {seasonName} - {episode.name}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 z-10">
        <ActionButton label="Minimize" tooltip="Minimize Player" onClick={handlePiP} variant="neon">
          <Icon icon="fa6-solid:compress" className="w-5 h-5 sm:w-6 sm:h-6" />
        </ActionButton>
        <ActionButton
          disabled={!prevEpisodeNumber}
          label="Previous Episode"
          tooltip="Previous Episode"
          href={`/tv/${id}/${episode.season_number}/${prevEpisodeNumber}/player?src=${selectedSource}`}
          variant="neon"
        >
          <Icon icon="fa6-solid:backward-step" className="w-5 h-5 sm:w-6 sm:h-6" />
        </ActionButton>
        <ActionButton
          disabled={!nextEpisodeNumber}
          label="Next Episode"
          tooltip="Next Episode"
          href={`/tv/${id}/${episode.season_number}/${nextEpisodeNumber}/player?src=${selectedSource}`}
          variant="neon"
        >
          <Icon icon="fa6-solid:forward-step" className="w-5 h-5 sm:w-6 sm:h-6" />
        </ActionButton>
        <ActionButton label="Sources" tooltip="Sources" onClick={onOpenSource} variant="neon">
          <Icon icon="fa6-solid:server" className="w-5 h-5 sm:w-6 sm:h-6" />
        </ActionButton>
        <ActionButton label="Episodes" tooltip="Episodes" onClick={onOpenEpisode} variant="neon">
          <Icon icon="fa6-solid:list-ul" className="w-5 h-5 sm:w-6 sm:h-6" />
        </ActionButton>
      </div>
    </div>
  );
};

export default TvShowPlayerHeader;
