interface VideoDetails {
    title: string;
    server: string;
    ref: string;
    xid: string;
    uwuId: string;
    episodeId: string;
    hash: string;
    poster: string;
    servers?: Server[];
    seasons?: Season[];
}

interface Season {
    id: string;
    seasonNumber: string;
    episodes: Episode[];
}

interface Episode {
    id: string;
    episodeNumber: string;
    title: string;
}

interface Server {
    name: string;
    hash: string;
}

const API_URL = "https://embed.su";

async function getVideo(
    id: number,
    season?: number,
    episode?: number
): Promise<VideoDetails | undefined> {
    let url: string;
    if (season !== undefined && episode !== undefined) {
        url = `${API_URL}/embed/tv/${id}/${season}/${episode}`;
    } else {
        url = `${API_URL}/embed/movie/${id}`;
    }

    const response: Response = await fetch(url);
    if (!response.ok) {
        console.error("Error fetching video details:", response.statusText);
        return;
    }
    const html = await response.text();
    const match = html.match(/window\.vConfig = JSON\.parse\(atob\(`(.+?)`\)\)/);

    if (match && match[1]) {
        const decodedData: VideoDetails = JSON.parse(
            Buffer.from(match[1], "base64").toString()
        );

        const firstDecode = atob(decodedData.hash).split(".").map(item => { return item.split("").reverse().join("") })
        const secondDecode = JSON.parse(atob(firstDecode.join("").split("").reverse().join("")))
        const servers = secondDecode.map((server: Server) => { return { name: server.name, hash: server.hash } })

        return {
            ...decodedData,
            servers: servers,
        };
    }
    console.error("Unable to extract video details");
}

interface StreamDetails {
    source: string;
    subtitles: Subtitle[];
    skips: any[];
    format: string;
}

interface Subtitle {
    label: string;
    file: string;
}

async function getStreamUrl(hash: string): Promise<StreamDetails> {
    const url = `${API_URL}/api/e/${hash}`;

    const response: Response = await fetch(url);
    const data = await response.json();
    if (response.status === 404) {
        console.error("Error fetching stream details:", data.error);
    }

    return {
        source: data.source,
        subtitles: data.subtitles,
        skips: data.skips,
        format: data.format,
    };
}

function addCount(player: string, referer: string, title: string) {
    const url = "https://pixel.embed.su/count";

    const params = new URLSearchParams({
        p: player,
        r: referer,
        t: title,
    });

    fetch(url, {
        method: "POST",
        body: params,
    }).catch((error) => {
        console.error("Error adding count:", error);
    });
}

export { getVideo, getStreamUrl, addCount };
export type { VideoDetails, StreamDetails, Subtitle };
