import React from "react";

interface IconProps {
  className?: string;
  solid?: boolean;
}

/**
 * Home Icon - Cinema marquee / theater entrance
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
        {/* Theater structure */}
        <path
          d="M2 22V8l10-6 10 6v14H2z"
          fill="currentColor"
        />
        {/* Entrance arch */}
        <path
          d="M8 22v-6a4 4 0 018 0v6"
          fill="black"
        />
        {/* Marquee top */}
        <rect x="6" y="8" width="12" height="3" rx="0.5" fill="black" opacity="0.7" />
        {/* Marquee lights */}
        <circle cx="8" cy="9.5" r="0.75" fill="currentColor" />
        <circle cx="12" cy="9.5" r="0.75" fill="currentColor" />
        <circle cx="16" cy="9.5" r="0.75" fill="currentColor" />
      </>
    ) : (
      <>
        {/* Theater outline */}
        <path
          d="M3 21V9l9-5.5L21 9v12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Floor line */}
        <path d="M3 21h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        {/* Entrance arch */}
        <path
          d="M8 21v-5a4 4 0 018 0v5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Marquee */}
        <rect x="7" y="9" width="10" height="2" rx="0.5" stroke="currentColor" strokeWidth="1.5" />
      </>
    )}
  </svg>
);

/**
 * Discover Icon - Director's viewfinder / film frame
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
        {/* Viewfinder body */}
        <rect x="3" y="5" width="18" height="14" rx="2" fill="currentColor" />
        {/* Inner frame */}
        <rect x="6" y="8" width="12" height="8" rx="1" fill="black" />
        {/* Crosshairs */}
        <path d="M12 8v8M6 12h12" stroke="currentColor" strokeWidth="1.5" />
        {/* Corner marks */}
        <path d="M7 9h2v2M15 9h2v2M7 13v2h2M15 15h2v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ) : (
      <>
        {/* Outer frame */}
        <rect
          x="3"
          y="5"
          width="18"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
        />
        {/* Inner viewfinder */}
        <rect
          x="6"
          y="8"
          width="12"
          height="8"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        {/* Crosshairs */}
        <path
          d="M12 8v8M6 12h12"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />
        {/* Focus corners */}
        <path
          d="M7 9h1.5M7 9v1.5M17 9h-1.5M17 9v1.5M7 15h1.5M7 15v-1.5M17 15h-1.5M17 15v-1.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </>
    )}
  </svg>
);

/**
 * Search Icon - Spotlight / cinema search
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
        {/* Spotlight housing */}
        <circle cx="9" cy="9" r="7" fill="currentColor" />
        {/* Inner lens */}
        <circle cx="9" cy="9" r="4" fill="black" opacity="0.6" />
        {/* Lens center highlight */}
        <circle cx="9" cy="9" r="2" fill="currentColor" opacity="0.8" />
        {/* Light beam / handle */}
        <path
          d="M14 14l7 7"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Lens flare */}
        <path d="M5.5 6a3 3 0 012.5-2" stroke="black" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      </>
    ) : (
      <>
        {/* Outer ring */}
        <circle
          cx="9"
          cy="9"
          r="6"
          stroke="currentColor"
          strokeWidth="2"
        />
        {/* Inner lens ring */}
        <circle
          cx="9"
          cy="9"
          r="3"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.6"
        />
        {/* Center dot */}
        <circle cx="9" cy="9" r="1" fill="currentColor" />
        {/* Handle / beam */}
        <path
          d="M14 14l7 7"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Lens shine */}
        <path
          d="M6 6.5a3 3 0 012-1.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.4"
        />
      </>
    )}
  </svg>
);

/**
 * Library Icon - Film vault / media archive
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
        {/* Vault door */}
        <rect x="3" y="3" width="18" height="18" rx="3" fill="currentColor" />
        {/* Vault handle ring */}
        <circle cx="12" cy="12" r="5" fill="black" opacity="0.5" />
        <circle cx="12" cy="12" r="3.5" fill="currentColor" />
        {/* Film reel spokes */}
        <path d="M12 8.5v7M9.5 12h5" stroke="black" strokeWidth="2" strokeLinecap="round" />
        {/* Corner rivets */}
        <circle cx="6" cy="6" r="1" fill="black" />
        <circle cx="18" cy="6" r="1" fill="black" />
        <circle cx="6" cy="18" r="1" fill="black" />
        <circle cx="18" cy="18" r="1" fill="black" />
      </>
    ) : (
      <>
        {/* Vault outline */}
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="3"
          stroke="currentColor"
          strokeWidth="2"
        />
        {/* Vault wheel */}
        <circle
          cx="12"
          cy="12"
          r="4.5"
          stroke="currentColor"
          strokeWidth="2"
        />
        {/* Wheel spokes */}
        <path
          d="M12 7.5v9M7.5 12h9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Center */}
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        {/* Corner rivets */}
        <circle cx="6" cy="6" r="0.75" fill="currentColor" />
        <circle cx="18" cy="6" r="0.75" fill="currentColor" />
        <circle cx="6" cy="18" r="0.75" fill="currentColor" />
        <circle cx="18" cy="18" r="0.75" fill="currentColor" />
      </>
    )}
  </svg>
);

/**
 * About Icon - Film clapperboard
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
        {/* Clapper top */}
        <path d="M4 4h16l-2 5H6L4 4z" fill="currentColor" />
        {/* Stripes on clapper */}
        <path d="M6 4l1 5M10 4l1 5M14 4l1 5M18 4l1 5" stroke="black" strokeWidth="2" />
        {/* Board body */}
        <rect x="4" y="9" width="16" height="12" rx="1" fill="currentColor" />
        {/* Info content */}
        <circle cx="12" cy="13" r="1.25" fill="black" />
        <rect x="10.5" y="15" width="3" height="4" rx="0.75" fill="black" />
      </>
    ) : (
      <>
        {/* Clapper top */}
        <path
          d="M4 5h16l-1.5 4H5.5L4 5z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Stripes */}
        <path
          d="M7 5l1 4M11 5l1 4M15 5l1 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Board */}
        <rect
          x="4"
          y="9"
          width="16"
          height="11"
          rx="1"
          stroke="currentColor"
          strokeWidth="2"
        />
        {/* Info symbol */}
        <circle cx="12" cy="12.5" r="1" fill="currentColor" />
        <path
          d="M12 15v3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </>
    )}
  </svg>
);

