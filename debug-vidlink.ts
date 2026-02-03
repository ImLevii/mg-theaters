import { getVideo } from "./src/libraries/vidsrc/vidlinkpro.ts";

async function test() {
    console.log("Testing VidLink fetching...");
    try {
        // Testing with a known movie ID (e.g., Inception: 27205)
        const data = await getVideo({ type: 'movie', id: '27205' });
        console.log("Result:", JSON.stringify(data, null, 2));
    } catch (e) {
        console.error("Error:", e);
    }
}

test();
