
import { NextRequest, NextResponse } from "next/server";
import { getVidLinkProVideo } from "@/libraries/vidsrc";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");
    const type = searchParams.get("type"); // 'movie' or 'tv'
    const season = searchParams.get("season");
    const episode = searchParams.get("episode");

    if (!id || !type) {
        return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    try {
        let videoData;

        if (type === "movie") {
            videoData = await getVidLinkProVideo({
                id: id,
                type: "movie"
            });
        } else if (type === "tv") {
            if (!season || !episode) {
                return NextResponse.json({ error: "Season and episode required for TV shows" }, { status: 400 });
            }
            videoData = await getVidLinkProVideo({
                id: id,
                season: Number(season),
                episode: Number(episode),
                type: "tv"
            });
        } else {
            return NextResponse.json({ error: "Invalid type" }, { status: 400 });
        }

        if (!videoData) {
            return NextResponse.json({ error: "No stream found" }, { status: 404 });
        }

        return NextResponse.json(videoData);

    } catch (error) {
        console.error("Error fetching stream:", error);
        return NextResponse.json({ error: "Failed to fetch stream" }, { status: 500 });
    }
}
