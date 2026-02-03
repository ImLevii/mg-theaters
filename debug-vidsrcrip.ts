import { getVideo, getStreamUrl } from "./src/libraries/vidsrc/vidsrcrip.ts";

async function test() {
    console.log("Testing Vidsrc.rip fetching...");
    try {
        // Testing with a known movie ID (e.g., Inception: 27205)
        // Wait, vidsrcrip.ts expects `id` as string.
        const config = await getVideo("27205");

        if (!config) {
            console.error("No config found");
            return;
        }
        console.log("Config:", JSON.stringify(config, null, 2));

        if (config.servers && config.servers.length > 0) {
            const server = config.servers[0];
            console.log(`Fetching stream for server: ${server}`);

            // getStreamUrl takes (server, id, season?, episode?)
            const stream = await getStreamUrl(server, "27205");
            console.log("Stream:", JSON.stringify(stream, null, 2));
        }
    } catch (e) {
        console.error("Error:", e);
    }
}

test();
