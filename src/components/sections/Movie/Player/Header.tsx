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
        "absolute top-0 z-[60] flex w-full items-center justify-between gap-4 pointer-events-none",
        "bg-gradient-to-b from-black/80 to-transparent p-6 text-white transition-opacity duration-300",
        { "opacity-0": hidden },
      )}
    >
      <div className="pointer-events-auto z-10">
        {!minimal && (
          <ActionButton label="Back" href={`/movie/${id}`}>
            <ArrowLeft className="w-8 h-8 sm:w-10 sm:h-10" />
          </ActionButton>
        )}
      </div>

      {!minimal && (
        <div className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center pointer-events-none">
          <div className="hidden md:flex max-w-[50%] flex-col justify-center text-center">
            <p className="text-sm text-white text-shadow-lg sm:text-lg lg:text-xl font-bold truncate px-4">
              {movieName}
            </p>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 sm:gap-4 pointer-events-auto z-10">
        <div className="flex items-center gap-1 sm:gap-2">
          <ActionButton label="Minimize" tooltip="Minimize Player" onClick={handlePiP}>
            <Icon icon="fluent:minimize-24-regular" className="w-6 h-6 sm:w-8 sm:h-8" />
          </ActionButton>
          <ActionButton label="Sources" tooltip="Sources" onClick={onOpenSource}>
            <Server className="w-6 h-6 sm:w-8 sm:h-8" />
          </ActionButton>
        </div>
      </div>
    </div>
  );
};

export default MoviePlayerHeader;
