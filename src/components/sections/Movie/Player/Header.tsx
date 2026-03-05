"use client";

import { cn } from "@/utils/helpers";
import { ArrowLeft, Server } from "@/utils/icons";
import ActionButton from "./ActionButton";

interface MoviePlayerHeaderProps {
  id: number;
  movieName: string;
  hidden?: boolean;
  onOpenSource: () => void;
  minimal?: boolean;
}

import { usePiPStore } from "@/hooks/usePiPStore";
import { getMoviePlayers } from "@/utils/players";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";

import { useAutoPlay } from "@/hooks/useAutoPlay";

const MoviePlayerHeader: React.FC<MoviePlayerHeaderProps> = ({
  id,
  movieName,
  hidden,
  onOpenSource,
  minimal,
}) => {
  const router = useRouter();
  const { openPiP } = usePiPStore();
  const [selectedSource] = useQueryState("src", parseAsInteger.withDefault(0));
  const { autoPlay, toggleAutoPlay } = useAutoPlay();

  const handlePiP = () => {
    const players = getMoviePlayers(id);
    const player = players[selectedSource] || players[0];
    openPiP(player.source, movieName, { id, type: "movie" });
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
        {!minimal && (
          <ActionButton label="Back" href={`/movie/${id}`} variant="neon">
            <Icon icon="fa6-solid:chevron-left" className="w-5 h-5 sm:w-6 sm:h-6" />
          </ActionButton>
        )}
      </div>

      {!minimal && (
        <div className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center pointer-events-none">
          <div className="hidden md:flex max-w-[50%] flex-col justify-center text-center">
            <p className="text-sm text-shadow-lg sm:text-lg lg:text-xl font-orbitron font-bold tracking-widest uppercase truncate px-4 bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
              {movieName}
            </p>
            <div className="flex items-center justify-center gap-2 mt-1">
              <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-primary/50" />
              <span className="text-[9px] font-orbitron tracking-[0.3em] text-primary/80 uppercase font-bold">Now Playing</span>
              <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-primary/50" />
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 sm:gap-4 z-10">
        <div className="flex items-center gap-2 sm:gap-3">
          <ActionButton
            label="Auto-play"
            tooltip={`Auto-play: ${autoPlay ? 'ON' : 'OFF'}`}
            onClick={toggleAutoPlay}
            variant="neon"
            className={cn(autoPlay ? "text-primary" : "text-white/40")}
          >
            <Icon icon={autoPlay ? "fa6-solid:toggle-on" : "fa6-solid:toggle-off"} className="w-5 h-5 sm:w-6 sm:h-6" />
          </ActionButton>
          <ActionButton
            label="Minimize"
            tooltip="Minimize Player"
            onClick={handlePiP}
            variant="neon"
          >
            <Icon icon="fa6-solid:compress" className="w-5 h-5 sm:w-6 sm:h-6" />
          </ActionButton>
          <ActionButton
            label="Sources"
            tooltip="Sources"
            onClick={onOpenSource}
            variant="neon"
          >
            <Icon icon="fa6-solid:server" className="w-5 h-5 sm:w-6 sm:h-6" />
          </ActionButton>
        </div>
      </div>
    </div>
  );
};

export default MoviePlayerHeader;
