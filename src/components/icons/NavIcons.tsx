import React from "react";

interface IconProps {
  className?: string;
  solid?: boolean;
}

/**
 * Home Icon - Modern cinema home with screen glow
 */
export const HomeIcon = ({ className, solid = false }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {solid ? (
      <>
        {/* Solid house */}
        <path
          d="M12 2.5L2 10v11a1 1 0 001 1h18a1 1 0 001-1V10L12 2.5z"
          fill="currentColor"
        />
        {/* Cinema screen with inner glow */}
        <rect x="7" y="11" width="10" height="6" rx="0.5" fill="black" opacity="0.8" />
        {/* Screen content - play symbol */}
        <path d="M10.5 12.5v3l3-1.5-3-1.5z" fill="currentColor" />
      </>
    ) : (
      <>
        {/* House outline with roof */}
        <path
          d="M3 10.5L12 3l9 7.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* House body */}
        <path
          d="M5 9v11a1 1 0 001 1h12a1 1 0 001-1V9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Cinema screen */}
        <rect
          x="8"
          y="12"
          width="8"
          height="5"
          rx="0.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        {/* Play button */}
        <path
          d="M11 13.5v2l2-1-2-1z"
          fill="currentColor"
        />
      </>
    )}
  </svg>
);

/**
 * Discover Icon - Compass with film aesthetic
 */
export const DiscoverIcon = ({ className, solid = false }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {solid ? (
      <>
        {/* Main circle */}
        <circle cx="12" cy="12" r="10" fill="currentColor" />
        {/* Compass diamond */}
        <path
          d="M12 5l2 5.5 5.5 2-5.5 2-2 5.5-2-5.5L4.5 12l5.5-2L12 5z"
          fill="black"
        />
        {/* Center dot */}
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </>
    ) : (
      <>
        {/* Outer circle */}
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="2"
        />
        {/* Compass points */}
        <path
          d="M12 6l1.5 4L18 12l-4.5 1.5L12 18l-1.5-4.5L6 12l4.5-1.5L12 6z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Center */}
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        {/* Cardinal ticks */}
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </>
    )}
  </svg>
);

/**
 * Search Icon - Premium magnifying glass
 */
export const SearchIcon = ({ className, solid = false }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {solid ? (
      <>
        {/* Main lens */}
        <circle cx="10" cy="10" r="7" fill="currentColor" />
        {/* Handle */}
        <path
          d="M15 15l6 6"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Lens shine */}
        <path
          d="M6 7a4.5 4.5 0 014-3"
          stroke="black"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.6"
        />
      </>
    ) : (
      <>
        {/* Lens circle */}
        <circle
          cx="10"
          cy="10"
          r="6"
          stroke="currentColor"
          strokeWidth="2"
        />
        {/* Handle */}
        <path
          d="M14.5 14.5L21 21"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Lens glint */}
        <path
          d="M6.5 7a3.5 3.5 0 013-2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.5"
        />
      </>
    )}
  </svg>
);

/**
 * Library Icon - Premium stacked media collection
 */
export const LibraryIcon = ({ className, solid = false }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {solid ? (
      <>
        {/* Back layer */}
        <rect x="6" y="2" width="14" height="17" rx="2" fill="currentColor" opacity="0.35" />
        {/* Middle layer */}
        <rect x="4" y="4" width="14" height="17" rx="2" fill="currentColor" opacity="0.6" />
        {/* Front layer */}
        <rect x="2" y="6" width="14" height="16" rx="2" fill="currentColor" />
        {/* Play icon */}
        <path d="M7 12v5l5-2.5L7 12z" fill="black" />
      </>
    ) : (
      <>
        {/* Back layer */}
        <rect
          x="7"
          y="2"
          width="12"
          height="15"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.4"
        />
        {/* Middle layer */}
        <rect
          x="5"
          y="4.5"
          width="12"
          height="15"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.65"
        />
        {/* Front layer */}
        <rect
          x="3"
          y="7"
          width="12"
          height="15"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="2"
        />
        {/* Play icon */}
        <path
          d="M7 13v4l4-2-4-2z"
          fill="currentColor"
        />
      </>
    )}
  </svg>
);

/**
 * About Icon - Modern info with cinema flair
 */
export const AboutIcon = ({ className, solid = false }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {solid ? (
      <>
        {/* Circle background */}
        <circle cx="12" cy="12" r="10" fill="currentColor" />
        {/* Info dot */}
        <circle cx="12" cy="7.5" r="1.5" fill="black" />
        {/* Info line */}
        <rect x="10.5" y="10.5" width="3" height="7" rx="1" fill="black" />
      </>
    ) : (
      <>
        {/* Circle outline */}
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="2"
        />
        {/* Info dot */}
        <circle cx="12" cy="7.5" r="1.25" fill="currentColor" />
        {/* Info line */}
        <path
          d="M12 11v6.5"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </>
    )}
  </svg>
);

