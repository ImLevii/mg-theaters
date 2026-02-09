import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const video_id = searchParams.get('video_id');
        const tmdb = searchParams.get('tmdb');
        const season = searchParams.get('season');
        const episode = searchParams.get('episode');

        if (!video_id) {
            return new NextResponse('Missing video_id parameter', { status: 400 });
        }

        // Settings from se_player.php logic
        const settings = {
            video_id,
            tmdb: tmdb === '1' || tmdb === 'true' ? '1' : '0',
            season: season || '0',
            episode: episode || '0',
            player_font: 'Poppins',
            player_bg_color: '000000',
            player_font_color: 'ffffff',
            player_primary_color: '34cfeb',
            player_secondary_color: '6900e0',
            player_loader: '1',
            preferred_server: '0',
            player_sources_toggle_type: '2',
        };

        // Construct the request URL
        const baseUrl = 'https://getsuperembed.link/';
        const params = new URLSearchParams(settings);
        const requestUrl = `${baseUrl}?${params.toString()}`;

        // Fetch the player URL
        const response = await fetch(requestUrl, {
            method: 'GET',
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': baseUrl,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
            },
        });

        const playerUrl = await response.text();

        // Check if response is a valid URL
        if (playerUrl && playerUrl.trim().startsWith('https://')) {
            // Redirect to the actual player
            return NextResponse.redirect(playerUrl.trim());
        } else {
            // Forward the error message from the API
            return new NextResponse(playerUrl || 'Upstream server returned empty response', {
                status: 502,
            });
        }
    } catch (error) {
        console.error('Error in SuperEmbed proxy:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
