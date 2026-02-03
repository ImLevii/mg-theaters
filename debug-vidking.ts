async function test() {
    console.log("Testing VidKing fetching...");
    // Example movie: Inception (27205)
    // URL from documentation: https://www.vidking.net/embed/movie/27205
    const url = "https://www.vidking.net/embed/movie/27205";

    try {
        const response = await fetch(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
            }
        });

        console.log("Status:", response.status);
        const text = await response.text();
        console.log("Raw HTML (first 1000 chars):", text.substring(0, 1000));

        // Check for common patterns
        if (text.includes("m3u8")) console.log("Found m3u8");
        if (text.includes("config =")) console.log("Found config variable");
        if (text.includes("player")) console.log("Found player keyword");

    } catch (e) {
        console.error("Error:", e);
    }
}

test();
