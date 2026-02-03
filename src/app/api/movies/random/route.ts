import { tmdb } from "@/api/tmdb";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Generate a random page number (1-500 is generally safe for TMDB discover)
        const randomPage = Math.floor(Math.random() * 500) + 1;

        const discovered = await tmdb.discover.movie({
            page: randomPage,
            include_adult: false,
            include_video: false,
            language: "en-US",
            sort_by: "popularity.desc",
            "vote_count.gte": 100, // Ensure decent quality/popularity
        });

        if (!discovered.results || discovered.results.length === 0) {
            return NextResponse.json({ error: "No movies found" }, { status: 404 });
        }

        // Pick a random movie from the results
        const randomMovie =
            discovered.results[Math.floor(Math.random() * discovered.results.length)];

        return NextResponse.json({ id: randomMovie.id });
    } catch (error) {
        console.error("Error fetching random movie:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
