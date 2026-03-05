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

import { usePlayerStore } from "@/hooks/usePlayerStore";

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
  const { autoPlay, toggleAutoPlay } = usePlayerStore();

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
        "bg-gradient-to-b from-black/80 to-transparent p-3 text-white md:p-6",
        hidden
          ? "pointer-events-none -translate-y-2 opacity-0"
          : "pointer-events-auto translate-y-0 opacity-100",
      )}
    >
      <div className="z-10">
        {!minimal && (
          <ActionButton label="Back" href={`/movie/${id}`} variant="neon">
            <Icon icon="fa6-solid:chevron-left" className="h-5 w-5 sm:h-6 sm:w-6" />
          </ActionButton>
        )}
      </div>

      {!minimal && (
        <div className="pointer-events-none absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center">
          <div className="hidden max-w-[50%] flex-col justify-center text-center md:flex">
            <p className="font-orbitron truncate bg-gradient-to-r from-white via-white to-white/60 bg-clip-text px-4 text-sm font-bold tracking-widest text-transparent uppercase text-shadow-lg sm:text-lg lg:text-xl">
              {movieName}
            </p>
            <div className="mt-1 flex items-center justify-center gap-2">
              <div className="to-primary/50 h-[1px] w-8 bg-gradient-to-r from-transparent" />
              <span className="font-orbitron text-primary/80 text-[9px] font-bold tracking-[0.3em] uppercase">
                Now Playing
              </span>
              <div className="to-primary/50 h-[1px] w-8 bg-gradient-to-l from-transparent" />
            </div>
          </div>
        </div>
      )}

      <div className="z-10 flex items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <ActionButton
            label="Auto-play"
            tooltip={`Auto-play: ${autoPlay ? "ON" : "OFF"}`}
            onClick={toggleAutoPlay}
            variant="neon"
            className={cn(autoPlay ? "text-primary" : "text-white/40")}
          >
            <Icon
              icon={autoPlay ? "fa6-solid:toggle-on" : "fa6-solid:toggle-off"}
              className="h-5 w-5 sm:h-6 sm:w-6"
            />
          </ActionButton>
          <ActionButton
            label="Minimize"
            tooltip="Minimize Player"
            onClick={handlePiP}
            variant="neon"
          >
            <Icon icon="fa6-solid:compress" className="h-5 w-5 sm:h-6 sm:w-6" />
          </ActionButton>
          <ActionButton label="Sources" tooltip="Sources" onClick={onOpenSource} variant="neon">
            <Icon icon="fa6-solid:server" className="h-5 w-5 sm:h-6 sm:w-6" />
          </ActionButton>
        </div>
      </div>
    </div>
  );
};

export default MoviePlayerHeader;
