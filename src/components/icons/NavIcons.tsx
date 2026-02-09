import React from "react";

interface IconProps {
  className?: string;
  solid?: boolean;
}

/**
 * Home Icon - Cinema/Theater inspired house with play button
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
        {/* Filled house with cinema screen */}
        <path
          d="M3 10.182V21a1 1 0 001 1h16a1 1 0 001-1V10.182a1 1 0 00-.36-.768l-8-6.667a1 1 0 00-1.28 0l-8 6.667A1 1 0 003 10.182z"
          fill="currentColor"
        />
        {/* Play button cutout */}
        <path d="M10 10v6l5-3-5-3z" fill="black" />
      </>
    ) : (
      <>
        {/* House outline */}
        <path
          d="M3.5 10.182V20.5a.5.5 0 00.5.5h16a.5.5 0 00.5-.5V10.182a.5.5 0 00-.18-.384l-8-6.667a.5.5 0 00-.64 0l-8 6.667a.5.5 0 00-.18.384z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Play button */}
        <path
          d="M10 10v6l5-3-5-3z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    )}
  </svg>
);

/**
 * Discover Icon - Film reel / compass hybrid
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
        {/* Outer ring */}
        <circle cx="12" cy="12" r="10" fill="currentColor" />
        {/* Film sprocket holes */}
        <circle cx="12" cy="4" r="1.5" fill="black" />
        <circle cx="12" cy="20" r="1.5" fill="black" />
        <circle cx="4" cy="12" r="1.5" fill="black" />
        <circle cx="20" cy="12" r="1.5" fill="black" />
        {/* Center pointer/compass */}
        <path d="M15 9l-6 2 2 6 6-2-2-6z" fill="black" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </>
    ) : (
      <>
        {/* Outer ring */}
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        {/* Film sprocket marks */}
        <circle
          cx="12"
          cy="4.5"
          r="1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle
          cx="12"
          cy="19.5"
          r="1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle
          cx="4.5"
          cy="12"
          r="1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle
          cx="19.5"
          cy="12"
          r="1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        {/* Compass needle */}
        <path
          d="M15 9l-6 2 2 6 6-2-2-6z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    )}
  </svg>
);

/**
 * Search Icon - Modern magnifying glass with cinema lens flare
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
        {/* Filled magnifying glass */}
        <circle cx="10.5" cy="10.5" r="7.5" fill="currentColor" />
        {/* Handle */}
        <rect
          x="15.5"
          y="14.5"
          width="7"
          height="3"
          rx="1.5"
          transform="rotate(45 15.5 14.5)"
          fill="currentColor"
        />
        {/* Lens flare / shine */}
        <path
          d="M7 7.5a4 4 0 013.5-3"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    ) : (
      <>
        {/* Magnifying glass circle */}
        <circle
          cx="10.5"
          cy="10.5"
          r="6.5"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        {/* Handle */}
        <path
          d="M15.5 15.5L21 21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Lens shine */}
        <path
          d="M7.5 7a3.5 3.5 0 013-2.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </>
    )}
  </svg>
);

/**
 * Library Icon - Stacked films / collection
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
        {/* Back card */}
        <rect
          x="5"
          y="2"
          width="14"
          height="18"
          rx="2"
          fill="currentColor"
          opacity="0.4"
        />
        {/* Middle card */}
        <rect
          x="4"
          y="4"
          width="14"
          height="18"
          rx="2"
          fill="currentColor"
          opacity="0.7"
        />
        {/* Front card */}
        <rect x="3" y="6" width="14" height="16" rx="2" fill="currentColor" />
        {/* Play icon on front card */}
        <path d="M9 11v6l4.5-3L9 11z" fill="black" />
      </>
    ) : (
      <>
        {/* Back card */}
        <rect
          x="7"
          y="2"
          width="12"
          height="16"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.5"
        />
        {/* Middle card */}
        <rect
          x="5"
          y="4"
          width="12"
          height="16"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.75"
        />
        {/* Front card */}
        <rect
          x="3"
          y="6"
          width="12"
          height="16"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        {/* Play icon */}
        <path
          d="M7 12v5l4-2.5L7 12z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    )}
  </svg>
);

/**
 * About Icon - Cinema ticket / info hybrid
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
        {/* Ticket shape */}
        <path
          d="M4 7a1 1 0 011-1h14a1 1 0 011 1v2.5a2 2 0 100 4V17a1 1 0 01-1 1H5a1 1 0 01-1-1v-3.5a2 2 0 100-4V7z"
          fill="currentColor"
        />
        {/* Perforation line */}
        <path
          d="M15 6v12"
          stroke="black"
          strokeWidth="2"
          strokeDasharray="2 2"
          strokeLinecap="round"
        />
        {/* Info "i" */}
        <circle cx="9" cy="9.5" r="1" fill="black" />
        <path d="M9 12v3" stroke="black" strokeWidth="2" strokeLinecap="round" />
      </>
    ) : (
      <>
        {/* Ticket outline */}
        <path
          d="M4 7.5a1 1 0 011-1h14a1 1 0 011 1v2a2.5 2.5 0 000 5v2a1 1 0 01-1 1H5a1 1 0 01-1-1v-2a2.5 2.5 0 000-5v-2z"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        {/* Perforation */}
        <path
          d="M15 6.5v11"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="2 2.5"
          strokeLinecap="round"
        />
        {/* Info dot */}
        <circle cx="9" cy="9" r="0.75" fill="currentColor" />
        {/* Info line */}
        <path
          d="M9 11.5v3.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </>
    )}
  </svg>
);

