import { cn } from "@/utils/helpers";
import { ArrowLeft, Server } from "@/utils/icons";
import ActionButton from "./ActionButton";

interface MoviePlayerHeaderProps {
  id: number;
  movieName: string;
  hidden?: boolean;
  onOpenSource: () => void;
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
        "absolute top-0 z-40 flex h-28 w-full items-start justify-between gap-4",
        "bg-linear-to-b from-black/80 to-transparent p-2 text-white transition-opacity md:p-4",
        { "opacity-0": hidden },
      )}
    >
      <ActionButton label="Back" href={`/movie/${id}`}>
        <ArrowLeft size={42} />
      </ActionButton>
      <div className="absolute left-1/2 hidden -translate-x-1/2 flex-col justify-center text-center sm:flex">
        <p className="text-sm text-white text-shadow-lg sm:text-lg lg:text-xl">{movieName}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <ActionButton label="Minimize" tooltip="Minimize Player" onClick={handlePiP}>
            <Icon icon="fluent:minimize-24-regular" width="34" />
          </ActionButton>
          <ActionButton label="Sources" tooltip="Sources" onClick={onOpenSource}>
            <Server size={34} />
          </ActionButton>
        </div>
      </div>
    </div>
  );
};

export default MoviePlayerHeader;
