import { tmdb } from "@/api/tmdb";
import { SiteConfigType } from "@/types";
import { HiComputerDesktop } from "react-icons/hi2";
import { IoIosSunny } from "react-icons/io";
import {
  IoMoon,
} from "react-icons/io5";
import {
  AboutIcon,
  DiscoverIcon,
  HomeIcon,
  LibraryIcon,
  SearchIcon,
} from "@/components/icons/NavIcons";

export const siteConfig: SiteConfigType = {
  name: "Cinextma",
  description: "Your only choice for a free movies and tv shows streaming website.",
  favicon: "/favicon.ico",
  navItems: [
    {
      label: "Home",
      href: "/",
      icon: <HomeIcon className="size-full" />,
      activeIcon: <HomeIcon className="size-full" solid />,
    },
    {
      label: "Discover",
      href: "/discover",
      icon: <DiscoverIcon className="size-full" />,
      activeIcon: <DiscoverIcon className="size-full" solid />,
    },
    {
      label: "Search",
      href: "/search",
      icon: <SearchIcon className="size-full" />,
      activeIcon: <SearchIcon className="size-full" solid />,
    },
    {
      label: "Library",
      href: "/library",
      icon: <LibraryIcon className="size-full" />,
      activeIcon: <LibraryIcon className="size-full" solid />,
    },
    {
      label: "About",
      href: "/about",
      icon: <AboutIcon className="size-full" />,
      activeIcon: <AboutIcon className="size-full" solid />,
    },
  ],
  themes: [
    {
      name: "light",
      icon: <IoIosSunny className="size-full" />,
    },
    {
      name: "dark",
      icon: <IoMoon className="size-full" />,
    },
    {
      name: "system",
      icon: <HiComputerDesktop className="size-full" />,
    },
  ],
  queryLists: {
    movies: [
      {
        name: "Today's Trending Movies",
        query: () => tmdb.trending.trending("movie", "day"),
        param: "todayTrending",
      },
      {
        name: "This Week's Trending Movies",
        query: () => tmdb.trending.trending("movie", "week"),
        param: "thisWeekTrending",
      },
      {
        name: "Popular Movies",
        query: () => tmdb.movies.popular(),
        param: "popular",
      },
      {
        name: "Now Playing Movies",
        query: () => tmdb.movies.nowPlaying(),
        param: "nowPlaying",
      },
      {
        name: "Upcoming Movies",
        query: () => tmdb.movies.upcoming(),
        param: "upcoming",
      },
      {
        name: "Top Rated Movies",
        query: () => tmdb.movies.topRated(),
        param: "topRated",
      },
    ],
    tvShows: [
      {
        name: "Today's Trending TV Shows",
        query: () => tmdb.trending.trending("tv", "day"),
        param: "todayTrending",
      },
      {
        name: "This Week's Trending TV Shows",
        query: () => tmdb.trending.trending("tv", "week"),
        param: "thisWeekTrending",
      },
      {
        name: "Popular TV Shows",
        // @ts-expect-error: Property 'adult' is missing in type 'PopularTvShowResult' but required in type 'TV'.
        query: () => tmdb.tvShows.popular(),
        param: "popular",
      },
      {
        name: "On The Air TV Shows",
        // @ts-expect-error: Property 'adult' is missing in type 'OnTheAirResult' but required in type 'TV'.
        query: () => tmdb.tvShows.onTheAir(),
        param: "onTheAir",
      },
      {
        name: "Top Rated TV Shows",
        // @ts-expect-error: Property 'adult' is missing in type 'TopRatedTvShowResult' but required in type 'TV'.
        query: () => tmdb.tvShows.topRated(),
        param: "topRated",
      },
    ],
  },
  socials: {
    github: "https://github.com/wisnuwirayuda15/cinextma",
  },
};

export type SiteConfig = typeof siteConfig;
