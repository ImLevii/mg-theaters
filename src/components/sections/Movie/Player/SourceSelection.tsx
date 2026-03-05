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
    { icon: "solar:star-bold-duotone", label: "Recommended", color: "text-warning" },
    { icon: "solar:rocket-bold-duotone", label: "Fast hosting", color: "text-danger" },
    { icon: "solar:clock-circle-bold-duotone", label: "Progress Support", color: "text-success" },
    { icon: "solar:reproduction-bold-duotone", label: "May contain ads", color: "text-primary" },
  ];

  return (
    <VaulDrawer
      open={opened}
      onClose={onClose}
      backdrop="blur"
      title={
        <div className="flex flex-col items-center gap-1">
          <span className="font-orbitron font-extrabold tracking-[0.2em] text-xl sm:text-2xl uppercase bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent drop-shadow-sm">
            Select Source
          </span>
          <div className="h-1 w-12 rounded-full bg-primary/30" />
        </div>
      }
      direction={mobile ? "bottom" : "right"}
      hiddenHandler
      withCloseButton
      classNames={{ 
        content: "bg-black/80 backdrop-blur-2xl border-l border-white/5",
        contentWrapper: "max-w-md",
        childrenWrapper: "p-0"
      }}
    >
      <div className="flex flex-col h-full bg-transparent">
        {/* Legend */}
        <div className="grid grid-cols-2 gap-3 p-6 border-b border-white/5 bg-white/5">
          {legendItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-[10px] sm:text-xs font-medium text-white/60">
              <Icon icon={item.icon} className={cn("w-4 h-4", item.color)} />
              <span className="uppercase tracking-wider">{item.label}</span>
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
                  "bg-white/5 border border-white/5 hover:bg-white/10 hover:border-primary/30",
                  isSelected && "bg-primary/10 border-primary/50 shadow-[0_0_20px_rgba(var(--heroui-primary-rgb),0.15)] outline outline-primary/30"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-lg bg-black/40 border border-white/10 group-hover:border-primary/50 transition-colors",
                    isSelected && "border-primary text-primary shadow-[0_0_10px_rgba(var(--heroui-primary-rgb),0.3)]"
                  )}>
                    <span className="font-orbitron font-bold text-sm tracking-tighter">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex flex-col items-start translate-y-[1px]">
                    <span className={cn(
                      "font-bold text-sm sm:text-base tracking-wide transition-colors",
                      isSelected ? "text-primary" : "text-white/90 group-hover:text-white"
                    )}>
                      {player.title}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <AnimatePresence>
                    {player.recommended && (
                      <Icon icon="solar:star-bold-duotone" className="w-4 h-4 text-warning drop-shadow-[0_0_5px_rgba(var(--heroui-warning-rgb),0.5)]" />
                    )}
                    {player.fast && (
                      <Icon icon="solar:rocket-bold-duotone" className="w-4 h-4 text-danger drop-shadow-[0_0_5px_rgba(var(--heroui-danger-rgb),0.5)]" />
                    )}
                    {player.resumable && (
                      <Icon icon="solar:clock-circle-bold-duotone" className="w-4 h-4 text-success drop-shadow-[0_0_5px_rgba(var(--heroui-success-rgb),0.5)]" />
                    )}
                    {player.ads && (
                      <Icon icon="solar:reproduction-bold-duotone" className="w-4 h-4 text-primary drop-shadow-[0_0_5px_rgba(var(--heroui-primary-rgb),0.5)]" />
                    )}
                  </AnimatePresence>
                </div>

                {isSelected && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute left-[-2px] top-1/2 -translate-y-1/2 w-1 h-2/3 bg-primary rounded-full shadow-[0_0_10px_rgba(var(--heroui-primary-rgb),0.8)]"
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
