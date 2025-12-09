"use client";

import useDiscoverFilters from "@/hooks/useDiscoverFilters";
import { ContentType } from "@/types";
import { Button, cn } from "@heroui/react";
import { Icon } from "@iconify/react";

const StreamingProviders = () => {
    const { content, setContent, resetFilters } = useDiscoverFilters();

    const handleTypeChange = (type: ContentType) => {
        if (content === type) return;
        resetFilters();
        setContent(type);
    };

    const providers = [
        { name: "Netflix", icon: "simple-icons:netflix" },
        { name: "Disney+", icon: "simple-icons:disneyplus" },
        { name: "Apple TV", icon: "simple-icons:appletv" },
        { name: "Prime Video", icon: "simple-icons:primevideo" },
        { name: "HBO Max", icon: "simple-icons:hbo" },
        { name: "Hulu", icon: "simple-icons:hulu" },
    ];

    return (
        <div className="flex w-full flex-col gap-6">
            {/* Header & Controls */}
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <Icon icon="solar:clapperboard-text-bold" className="text-xl text-gray-400" />
                        <h2 className="text-xl font-bold text-white">Streaming Providers</h2>
                    </div>
                    <p className="text-sm text-gray-500">
                        Browse content from your favorite streaming services
                    </p>
                </div>

                {/* Toggle Controls */}
                <div className="flex items-center rounded-lg bg-white/5 p-1">
                    <button
                        onClick={() => handleTypeChange("movie")}
                        className={cn(
                            "flex items-center gap-2 rounded-md px-4 py-1.5 text-sm font-medium transition-all",
                            content === "movie"
                                ? "bg-white/10 text-white shadow-sm"
                                : "text-gray-500 hover:text-gray-300"
                        )}
                    >
                        Movies
                    </button>
                    <button
                        onClick={() => handleTypeChange("tv")}
                        className={cn(
                            "flex items-center gap-2 rounded-md px-4 py-1.5 text-sm font-medium transition-all",
                            content === "tv"
                                ? "bg-white/10 text-white shadow-sm"
                                : "text-gray-500 hover:text-gray-300"
                        )}
                    >
                        TV Shows
                    </button>
                </div>
            </div>

            {/* Providers Grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
                {providers.map((provider) => (
                    <div
                        key={provider.name}
                        className="group flex h-16 cursor-pointer items-center justify-center rounded-xl border border-white/5 bg-white/5 transition-all hover:bg-white/10 hover:border-white/10"
                    >
                        <Icon
                            icon={provider.icon}
                            className="text-2xl text-gray-400 transition-colors group-hover:text-white"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StreamingProviders;
