interface VideoConfig {
    key: string;
    tmdbId: string;
    server: string;
    servers: string[];
    season?: string;
    episode?: string;
}

interface Stream {
    sources: {
        file: string;
        label: string;
    }[];
}

const API_URL = "https://vidsrc.rip/";

async function getVideo(
    id: string,
    season?: number,
    episode?: number
): Promise<VideoConfig | undefined> {
    let url: string;
    if (season !== undefined && episode !== undefined) {
        url = `${API_URL}/embed/tv/${id}/${season}/${episode}`;
    } else {
        url = `${API_URL}/embed/movie/${id}`;
    }

    const response = await fetch(url);
    const html = await response.text();

    const match = html.match(/window\.config\s*=\s*(\{[\s\S]*?\});/);

    if (match && match[1]) {
        const config = parseConfig(match[1]);
        return config;
    } else {
        console.error("Didn't find config in the page");
    }
}

function parseConfig(configString: string): VideoConfig {
    const content = configString.slice(1, -1).trim();
    const config: Partial<VideoConfig> = {};
    const regex = /(\w+):\s*(?:'([^']*)'|"([^"]*)"|(\[[^\]]*\])|([^,}]+))/g;
    let match;

    while ((match = regex.exec(content)) !== null) {
        const [, key, singleQuoted, doubleQuoted, arrayValue, unquotedValue] =
            match;
        let value: string | string[] =
            singleQuoted || doubleQuoted || unquotedValue;

        if (arrayValue) {
            value = JSON.parse(arrayValue) as string[];
        }

        if (key === "servers" && typeof value === "string") {
            value = [value];
        }

        config[key as keyof VideoConfig] = value as any;
    }

    return config as VideoConfig;
}

async function getStreamUrl(
    server: string,
    id: string,
    season?: string,
    episode?: string
): Promise<Stream | undefined> {
    const eheeh = `/api/source/${server}/${id}`;
    const key = await getKey();
    const url = new URL(`${API_URL}${eheeh}`);
    const vrf = generateVRF(key, eheeh);

    url.searchParams.append("vrf", vrf);
    if (season !== undefined && episode !== undefined) {
        url.searchParams.append("s", season);
        url.searchParams.append("e", episode);
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
        console.error("Error fetching stream details:", response.statusText);
        return;
    }

    const data = await response.json();
    if (response.status === 500) {
        console.error("Error in vidsrc.rip side:", data.error);
        console.warn("Test another server");
        return;
    }

    return data;
}

async function getKey() {
    const url = API_URL + "/images/skip-button.png";
    const response = await fetch(url);
    const res = await response.text();
    return res;
}

function xorEncryptDecrypt(key: string, message: string) {
    const keyCodes = Array.from(key, (char) => char.charCodeAt(0));
    const messageCodes = Array.from(message, (char) => char.charCodeAt(0));

    const result = [];
    for (let i = 0; i < messageCodes.length; i++) {
        result.push(messageCodes[i] ^ keyCodes[i % keyCodes.length]);
    }
    return String.fromCharCode.apply(null, result);
}

function generateVRF(key: string, encodedMessage: string) {
    const decodedMessage = decodeURIComponent(encodedMessage);
    const xorResult = xorEncryptDecrypt(key, decodedMessage);

    return encodeURIComponent(Buffer.from(xorResult).toString("base64"));
}

export { getVideo, getStreamUrl };
export type { VideoConfig, Stream };
