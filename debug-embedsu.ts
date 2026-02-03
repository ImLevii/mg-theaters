import { getVideo, getStreamUrl } from "./src/libraries/vidsrc/embed-su.ts";

async function test() {
    console.log("Testing Embed.su fetching...");
    try {
        // Testing with a known movie ID (e.g., Inception: 27205)
        const videoDetails = await getVideo(27205);
        if (!videoDetails) {
            console.error("No video details found");
            return;
        }
        console.log("Video Details:", JSON.stringify(videoDetails, null, 2));

        if (videoDetails.servers && videoDetails.servers.length > 0) {
            // Try to get stream for first server
            // Note: embed-su.ts `getStreamUrl` takes a hash.
            // The servers array has { name, hash }.
            const firstServer = videoDetails.servers[0];
            console.log(`Fetching stream for server: ${firstServer.name} (hash: ${firstServer.hash})`);

            // Wait, getStreamUrl takes `hash`. 
            // In embed-su.ts: async function getStreamUrl(hash: string)
            // But verify what `hash` it expects. The `servers` array has `hash`.

            const stream = await getStreamUrl(firstServer.hash);
            console.log("Stream:", JSON.stringify(stream, null, 2));
        }
    } catch (e) {
        console.error("Error:", e);
    }
}

test();
