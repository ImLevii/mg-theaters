"use client";

import { Modal, ModalBody, ModalContent } from "@heroui/react";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { MovieDetails } from "tmdb-ts/dist/types/movies";
import { AppendToResponse } from "tmdb-ts/dist/types/options";
import { getMovieLastPosition } from "@/actions/histories";
import MoviePlayer from "./Player";
import React from "react";

interface PlayerModalProps {
    movie: AppendToResponse<MovieDetails, "videos"[], "movie"> | MovieDetails;
    children: (onOpen: () => void) => React.ReactNode;
}

const PlayerModal: React.FC<PlayerModalProps> = ({ movie, children }) => {
    const [opened, handlers] = useDisclosure(false);

    const { data: startAt } = useQuery({
        queryFn: () => getMovieLastPosition(movie.id),
        queryKey: ["movie-player-start-at", movie.id],
        enabled: opened, // Only fetch when opened
    });

    return (
        <>
            {children(handlers.open)}
            <Modal
                backdrop="blur"
                size="full"
                isOpen={opened}
                onClose={handlers.close}
                hideCloseButton
                classNames={{
                    base: "bg-black/95",
                    body: "p-0",
                }}
            >
                <ModalContent className="h-[100dvh] w-screen m-0 rounded-none">
                    {(onClose) => (
                        <ModalBody className="p-0 h-full w-full overflow-hidden">
                            {opened && (
                                <div className="h-full w-full relative">
                                    {/* Custom Close Button for the player overlay if needed, 
                            but MoviePlayer might have its own header. 
                            We pass a way to close logic if needed. 
                            For now, relying on MoviePlayer header or default behavior.
                        */}
                                    <button
                                        onClick={onClose}
                                        className="absolute top-4 right-4 z-50 text-white/50 hover:text-white transition-colors"
                                    >
                                        {/* Simple X icon */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z" /></svg>
                                    </button>
                                    <MoviePlayer movie={movie as MovieDetails} startAt={startAt} />
                                </div>
                            )}
                        </ModalBody>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default PlayerModal;
