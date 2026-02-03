
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
        console.log(`[API] Fetching stream for id=${id} type=${type} season=${season} episode=${episode}`);

        if (type === "movie") {
            videoData = await getVidLinkProVideo({
                id: id,
                type: "movie"
            });
        } else if (type === "tv") {
            if (!season || !episode) {
                console.error("[API] Missing season/episode for TV");
                return NextResponse.json({ error: "Season and episode required for TV shows" }, { status: 400 });
            }
            videoData = await getVidLinkProVideo({
                id: id,
                season: Number(season),
                episode: Number(episode),
                type: "tv"
            });
        } else {
            console.error("[API] Invalid type:", type);
            return NextResponse.json({ error: "Invalid type" }, { status: 400 });
        }

        console.log("[API] VidLink response:", videoData ? "Data received" : "No data");

        if (!videoData) {
            console.error("[API] No video data returned from VidLink");
            return NextResponse.json({ error: "No stream found" }, { status: 404 });
        }

        if (!videoData.stream?.playlist) {
            console.error("[API] No playlist in video data:", JSON.stringify(videoData));
            return NextResponse.json({ error: "No playlist found" }, { status: 404 });
        }

        return NextResponse.json(videoData);

    } catch (error) {
        console.error("Error fetching stream:", error);
        return NextResponse.json({ error: "Failed to fetch stream" }, { status: 500 });
    }
}
