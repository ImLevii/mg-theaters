
import React from 'react';

export const HomeIcon = ({ className, solid = false }: { className?: string; solid?: boolean }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        {solid ? (
            <path
                d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
                fill="currentColor"
            />
        ) : (
            <path
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        )}
    </svg>
);

export const DiscoverIcon = ({ className, solid = false }: { className?: string; solid?: boolean }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        {solid ? (
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.19 12.19L6 18l3.81-8.19L18 6l-3.81 8.19z"
                fill="currentColor"
            />
        ) : (
            <>
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </>
        )}
    </svg>
);

export const SearchIcon = ({ className, solid = false }: { className?: string; solid?: boolean }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        {solid ? (
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.5 3.5a7 7 0 100 14 7 7 0 000-14zM1.5 10.5a9 9 0 1116.32 5.25l3.87 3.87a1 1 0 11-1.42 1.42l-3.87-3.87A9 9 0 011.5 10.5z"
                fill="currentColor"
            />
        ) : (
            <>
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </>
        )}
    </svg>
);

export const LibraryIcon = ({ className, solid = false }: { className?: string; solid?: boolean }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        {solid ? (
            <path
                d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 10H9v-2h9v2zm0-4H9V6h9v2z"
                fill="currentColor"
            />
        ) : (
            <path
                d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 7h10v2H7zm0 4h10v2H7z"
                fill="currentColor"
            />
        )}
    </svg>
);

export const AboutIcon = ({ className, solid = false }: { className?: string; solid?: boolean }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        {solid ? (
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
                fill="currentColor"
            />
        ) : (
            <>
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </>
        )}
    </svg>
);

