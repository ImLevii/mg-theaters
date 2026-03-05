import { PlayersProps } from "@/types";
import VaulDrawer from "@/components/ui/overlay/VaulDrawer";
import { HandlerType } from "@/types/component";
import { cn } from "@/utils/helpers";
import { Icon } from "@iconify/react";
import useIsMobile from "@/hooks/useIsMobile";
import { motion, AnimatePresence } from "framer-motion";

interface MoviePlayerSourceSelectionProps extends HandlerType {
  players: PlayersProps[];
  selectedSource: number;
  setSelectedSource: (source: number) => void;
}

const MoviePlayerSourceSelection: React.FC<MoviePlayerSourceSelectionProps> = ({
  opened,
  onClose,
  players,
  selectedSource,
  setSelectedSource,
}) => {
  const mobile = useIsMobile();

  const legendItems = [
    { icon: "fa6-solid:star", label: "Recommended", color: "text-warning" },
    { icon: "fa6-solid:bolt-lightning", label: "Fast hosting", color: "text-danger" },
    { icon: "fa6-solid:clock-rotate-left", label: "Progress Support", color: "text-success" },
    { icon: "fa6-solid:rectangle-ad", label: "May contain ads", color: "text-primary" },
  ];

  return (
    <VaulDrawer
      open={opened}
      onClose={onClose}
      backdrop="blur"
      title={
        <div className="flex flex-col items-center gap-1">
          <span className="font-orbitron font-extrabold tracking-[0.2em] text-xl sm:text-2xl uppercase bg-gradient-to-r from-primary to-red-700 bg-clip-text text-transparent drop-shadow-sm">
            Select Source
          </span>
          <div className="h-1 w-12 rounded-full bg-primary/30" />
        </div>
      }
      direction={mobile ? "bottom" : "right"}
      hiddenHandler
      withCloseButton
      classNames={{ 
        content: "bg-black/95 backdrop-blur-2xl border-l border-white/10",
        contentWrapper: "max-w-md",
        childrenWrapper: "p-0"
      }}
    >
      <div className="flex flex-col h-full bg-transparent">
        {/* Legend */}
        <div className="grid grid-cols-2 gap-3 p-6 border-b border-white/[0.06] bg-white/[0.02]">
          {legendItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 text-[10px] sm:text-xs font-semibold text-white/50">
              <div className={cn("flex items-center justify-center w-6 h-6 rounded-lg bg-black/40 border border-white/5 shadow-lg")}>
                <Icon icon={item.icon} className={cn("w-3 h-3", item.color)} />
              </div>
              <span className="uppercase tracking-widest">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Source List */}
        <div className="p-4 sm:p-6 space-y-3 overflow-y-auto max-h-[calc(100dvh-200px)]">
          {players.map((player, index) => {
            const isSelected = selectedSource === index;
            return (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedSource(index);
                  onClose();
                }}
                className={cn(
                  "group relative w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300",
                  "bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] hover:border-primary/30",
                  isSelected && "bg-primary/15 border-primary/50 shadow-[0_0_25px_rgba(var(--heroui-primary-rgb),0.2)] outline outline-primary/20"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "flex items-center justify-center w-9 h-9 rounded-xl bg-black/60 border border-white/10 group-hover:border-primary/50 transition-all duration-300",
                    isSelected && "border-primary text-primary shadow-[0_0_15px_rgba(var(--heroui-primary-rgb),0.4)] scale-105"
                  )}>
                    <span className="font-orbitron font-bold text-sm tracking-tighter">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className={cn(
                      "font-bold text-sm sm:text-base tracking-wide transition-colors",
                      isSelected ? "text-primary" : "text-white/90 group-hover:text-white"
                    )}>
                      {player.title}
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-white/30 font-semibold group-hover:text-white/50">
                      High Quality Stream
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <AnimatePresence>
                    {player.recommended && (
                      <div className="p-1.5 rounded-lg bg-warning/10 border border-warning/20">
                        <Icon icon="fa6-solid:star" className="w-3.5 h-3.5 text-warning drop-shadow-[0_0_8px_rgba(var(--heroui-warning-rgb),0.6)]" />
                      </div>
                    )}
                    {player.fast && (
                      <div className="p-1.5 rounded-lg bg-danger/10 border border-danger/20">
                        <Icon icon="fa6-solid:bolt-lightning" className="w-3.5 h-3.5 text-danger drop-shadow-[0_0_8px_rgba(var(--heroui-danger-rgb),0.6)]" />
                      </div>
                    )}
                    {player.resumable && (
                      <div className="p-1.5 rounded-lg bg-success/10 border border-success/20">
                        <Icon icon="fa6-solid:clock-rotate-left" className="w-3.5 h-3.5 text-success drop-shadow-[0_0_8px_rgba(var(--heroui-success-rgb),0.6)]" />
                      </div>
                    )}
                    {player.ads && (
                      <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20">
                        <Icon icon="fa6-solid:rectangle-ad" className="w-3.5 h-3.5 text-primary drop-shadow-[0_0_8px_rgba(var(--heroui-primary-rgb),0.6)]" />
                      </div>
                    )}
                  </AnimatePresence>
                </div>

                {isSelected && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute left-[-2px] top-1/2 -translate-y-1/2 w-1.5 h-1/2 bg-primary rounded-full shadow-[0_0_15px_rgba(var(--heroui-primary-rgb),1)]"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </VaulDrawer>
  );
};

export default MoviePlayerSourceSelection;
