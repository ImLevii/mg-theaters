import { Image } from "@heroui/image";
import { Button } from "@heroui/react";
import { Play, Tv } from "lucide-react";
import dynamic from "next/dynamic";
const PlayerModal = dynamic(() => import("../Player/PlayerModal"));
import { useWindowScroll } from "@mantine/hooks";
import { MovieDetails } from "tmdb-ts/dist/types/movies";
import { AppendToResponse } from "tmdb-ts/dist/types/options";
import { getImageUrl } from "@/utils/movies";

const BackdropSection: React.FC<{
  movie: AppendToResponse<MovieDetails, ("images" | "videos")[], "movie"> | undefined;
}> = ({ movie }) => {
  const [{ y }] = useWindowScroll();
  const opacity = Math.min((y / 1000) * 2, 1);
  const backdropImage = getImageUrl(movie?.backdrop_path, "backdrop", true);
  const titleImage = getImageUrl(movie?.images.logos.find((logo) => logo.iso_639_1 === "en")?.file_path, "title");

  // Find Trailer
  const trailer = movie?.videos?.results?.find(
    (video) => video.site === "YouTube" && (video.type === "Trailer" || video.type === "Teaser")
  );

  return (
    <section id="backdrop" className="absolute top-0 left-0 w-full h-[120vh] -z-50 overflow-hidden pointer-events-none">
      {/* Ambient Global Glow - heavily blurred background filling the screen */}
      <div className="absolute inset-0 z-0">
        <Image
          removeWrapper
          alt="ambient"
          className="w-full h-full object-cover opacity-50 blur-[80px] scale-150 saturate-150"
          src={backdropImage}
        />
        <div className="absolute inset-0 bg-black/40" /> {/* Dimmer */}
        {/* Deep fade to black at the bottom to blend with site background */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      {/* Main Backdrop with Seamless Bottom Fade */}
      <div
        className="absolute top-0 left-0 w-full h-[85vh] z-0 select-none"
        style={{
          maskImage: "linear-gradient(to bottom, black 20%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 20%, transparent 100%)"
        }}
      >
        <div className="absolute inset-0 z-0">
          <Image
            removeWrapper
            radius="none"
            alt={movie?.original_language === "id" ? movie?.original_title : movie?.title}
            className="w-full h-full object-cover object-top opacity-100"
            src={backdropImage}
          />
          {/* Side Vignettes only - Bottom fade is handled by the container mask */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
        </div>
      </div>


      {/* Title Image (Logo) - Centered/Floating */}
      <div className="absolute top-[20vh] md:top-[30vh] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-6" style={{ opacity: 1 - opacity * 1.5, transform: `translate(-50%, ${y * 0.5}px)` }}>
        <Image
          removeWrapper
          alt="logo"
          className="w-[200px] md:w-[400px] drop-shadow-2xl"
          src={titleImage}
        />

        {/* Action Buttons */}
        <div className="flex items-center gap-4 pointer-events-auto">
          <Button
            onPress={() => {
              document.getElementById("movie-player-container")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold tracking-wider px-8 shadow-lg shadow-rose-900/20"
            size="lg"
            variant="shadow"
            startContent={<Play fill="currentColor" size={20} />}
          >
            PLAY NOW
          </Button>

          {trailer && (
            <Button
              as="a"
              href={`https://www.youtube.com/watch?v=${trailer.key}`}
              target="_blank"
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold tracking-wider px-8 hover:bg-white/20"
              size="lg"
              variant="flat"
              startContent={<Tv size={20} />}
            >
              TRAILER
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default BackdropSection;
