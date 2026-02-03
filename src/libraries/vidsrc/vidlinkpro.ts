import {
    randomBytes,
    createDecipheriv,
    createCipheriv,
} from "crypto";

interface EncryptedData {
    ct: string;
    iv: string;
    s: string;
}

interface Video {
    sourceID: string;
    stream: Stream;
}

interface Stream {
    id: string;
    type: string;
    playlist: string;
    flags: string[];
    captions: Caption[];
}

interface Caption {
    id: string;
    url: string;
    language: string;
    type: string;
    hasCorsRestrictions: boolean;
}


const API_URL = "https://vidlink.pro/api/b";
const keyHex: string = "2de6e6ea13a9df9503b11a6117fd7e51941e04a0c223dfeacfe8a1dbb6c52783";
const algo: string = "aes-256-cbc";

type MovieParams = {
    type: 'movie';
    id: string;
};

type TVParams = {
    type: 'tv';
    id: string;
    season: number;
    episode: number;
};

type AnimeParams = {
    type: 'anime';
    id: string;
    episode: number;
    dub?: boolean;
    fallback?: boolean;
};

type VideoParams = MovieParams | TVParams | AnimeParams;

async function getVideo(params: VideoParams): Promise<Video | undefined> {
    let url: string = "";
    const encodedId = Buffer.from(encrypt(params.id)).toString('base64');

    switch (params.type) {
        case 'tv':
            url = `${API_URL}/tv/${encodedId}/${params.season}/${params.episode}`;
            break;
        case 'anime':
            const dubParam = params.dub ? 'dub' : 'sub';
            const fallbackParam = params.fallback ? '?fallback=true' : '';
            url = `${API_URL}/anime/${encodedId}/${params.episode}/${dubParam}${fallbackParam}`;
            break;
        case 'movie':
            url = `${API_URL}/movie/${encodedId}`;
            break;
    }

    const response: Response = await fetch(url, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
            "Referer": "https://vidlink.pro/",
            "Origin": "https://vidlink.pro"
        }
    });
    if (!response.ok) {
        console.error("Error fetching video details:", response.status, response.statusText);
        return;
    }

    const text = await response.text();
    console.log("Raw response:", text.substring(0, 200)); // Log first 200 chars
    const decryptedData = decryptClearKey(text);
    return JSON.parse(decryptedData);
}

function encrypt(data: string): string {
    const iv = randomBytes(16);
    const key = Buffer.from(keyHex, "hex").slice(0, 32);

    const cipher = createCipheriv(algo, key, iv);
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
}

function decryptClearKey(data: string): string {
    const [ivHex, encryptedHex] = data.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const encrypted = Buffer.from(encryptedHex, "hex");
    const key = Buffer.from(keyHex, "hex").slice(0, 32);

    const decipher = createDecipheriv(algo, key, iv);
    let decrypted = decipher.update(encrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

export { getVideo };
export type { Video, Stream, Caption, EncryptedData, VideoParams, MovieParams, TVParams, AnimeParams };
