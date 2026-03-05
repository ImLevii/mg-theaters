import { PlayersProps } from "@/types";

/**
 * Generates a list of movie players with their respective titles and source URLs.
 * Each player is constructed using the provided movie ID.
 *
 * @param {string | number} id - The ID of the movie to be embedded in the player URLs.
 * @param {number} [startAt] - The start position in seconds to be embedded in the player URLs. Optional.
 * @returns {PlayersProps[]} - An array of objects, each containing
 * the title of the player and the corresponding source URL.
 */
export const getMoviePlayers = (id: string | number, startAt?: number): PlayersProps[] => {
  return [
    {
      title: "VidLink",
      source: `https://vidlink.pro/movie/${id}?player=jw&primaryColor=e50914&secondaryColor=a2a2a2&iconColor=eefdec&autoplay=false&startAt=${startAt || ""}`,
      recommended: true,
      fast: true,
      ads: false,
      resumable: true,
    },
    {
      title: "VidLink 2",
      source: `https://vidlink.pro/movie/${id}?primaryColor=e50914&autoplay=false&startAt=${startAt}`,
      recommended: true,
      fast: true,
      ads: false,
      resumable: true,
    },
    {
      title: "VidKing",
      // NOTE: VidKing has a known issue with the `progress` query parameter where it stuck at that timestamp.
      // Currently, this player can save playback progress but cannot resume from a specific timestamp.
      // The `progress` parameter is commented out in the source URL until this is resolved.
      source: `https://www.vidking.net/embed/movie/${id}?color=e50914&autoplay=false`, //&progress=${startAt || ""}`,
      recommended: true,
      fast: true,
      resumable: true,
    },
    {
      title: "SuperEmbed",
      source: `/api/proxy/superembed?video_id=${id}&tmdb=1`,
      recommended: true,
      fast: true,
      ads: false,
      resumable: true,
    },
    {
      title: "AutoEmbed 1",
      source: `https://autoembed.co/movie/tmdb/${id}`,
      recommended: true,
      fast: true,
      ads: false,
      resumable: true,
    },
    {
      title: "2Embed",
      source: `https://www.2embed.cc/embed/${id}`,
      ads: false,
    },
    {
      title: "VidSrc 1",
      source: `https://vidsrc.xyz/embed/movie/${id}`,
      ads: false,
    },
    {
      title: "VidSrc 2",
      source: `https://vidsrc.icu/embed/movie/${id}`,
      ads: false,
    },
  ];
};

/**
 * Generates a list of TV show players with their respective titles and source URLs.
 * Each player is constructed using the provided TV show ID, season, and episode.
 *
 * @param {string | number} id - The ID of the TV show to be embedded in the player URLs.
 * @param {string | number} [season] - The season number of the TV show episode to be embedded.
 * @param {string | number} [episode] - The episode number of the TV show episode to be embedded.
 * @param {number} [startAt] - The start position in seconds to be embedded in the player URLs. Optional.
 * @returns {PlayersProps[]} - An array of objects, each containing
 * the title of the player and the corresponding source URL.
 */
export const getTvShowPlayers = (
  id: string | number,
  season: number,
  episode: number,
  startAt?: number,
): PlayersProps[] => {
  return [
    {
      title: "VidLink",
      source: `https://vidlink.pro/tv/${id}/${season}/${episode}?player=jw&primaryColor=f5a524&secondaryColor=a2a2a2&iconColor=eefdec&autoplay=false&startAt=${startAt || ""}`,
      recommended: true,
      fast: true,
      ads: false,
      resumable: true,
    },
    {
      title: "VidLink 2",
      source: `https://vidlink.pro/tv/${id}/${season}/${episode}?primaryColor=f5a524&autoplay=false&startAt=${startAt}`,
      recommended: true,
      fast: true,
      ads: false,
      resumable: true,
    },
    {
      title: "VidKing",
      // NOTE: VidKing has a known issue with the `progress` query parameter where it stuck at that timestamp.
      // Currently, this player can save playback progress but cannot resume from a specific timestamp.
      // The `progress` parameter is commented out in the source URL until this is resolved.
      source: `https://www.vidking.net/embed/tv/${id}/${season}/${episode}?color=f5a524&autoplay=false`, //&progress=${startAt || ""}`,
      recommended: true,
      fast: true,
      resumable: true,
    },
    {
      title: "SuperEmbed",
      source: `/api/proxy/superembed?video_id=${id}&tmdb=1&season=${season}&episode=${episode}`,
      recommended: true,
      fast: true,
      ads: false,
      resumable: true,
    },
    {
      title: "AutoEmbed 1",
      source: `https://autoembed.co/tv/tmdb/${id}-${season}-${episode}`,
      recommended: true,
      fast: true,
      ads: false,
      resumable: true,
    },
    {
      title: "2Embed",
      source: `https://www.2embed.cc/embedtv/${id}&s=${season}&e=${episode}`,
      ads: false,
    },
    {
      title: "VidSrc 1",
      source: `https://vidsrc.xyz/embed/tv/${id}/${season}/${episode}`,
      ads: false,
    },
    {
      title: "VidSrc 2",
      source: `https://vidsrc.icu/embed/tv/${id}/${season}/${episode}`,
      ads: false,
    },
    {
      title: "VidSrc 3",
      source: `https://vidsrc.cc/v3/embed/tv/${id}/${season}/${episode}?autoPlay=false`,
      recommended: true,
      fast: true,
      ads: false,
    },
  ];
};
