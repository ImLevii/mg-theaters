import { NextRequest, NextResponse } from 'next/server';

// CSS to hide common ad elements
const AD_BLOCKING_CSS = `
    [class*="ad-"], [class*="ads-"], [id*="ad-"], [id*="ads-"],
    [class*="popup"], [class*="modal"], [class*="overlay"]:not(.video-overlay):not(.player-overlay),
    [class*="banner"], iframe[src*="ad"], div[data-ad],
    .ad, .ads, .advert, .advertisement, #overlay, .overlay-container,
    [onclick*="window.open"], [onclick*="popup"], a[target="_blank"][rel*="noopener"],
    div[style*="z-index: 999"], div[style*="z-index:999"],
    div[style*="z-index: 9999"], div[style*="z-index:9999"],
    div[style*="position: fixed"]:not(.player-controls):not(.video-controls) {
        display: none !important;
        visibility: hidden !important;
        pointer-events: none !important;
    }
    body { overflow: hidden !important; }
`;

// JavaScript to block popups and unwanted behavior
const AD_BLOCKING_JS = `
    (function() {
        // Block window.open
        const originalOpen = window.open;
        window.open = function() { return null; };
        
        // Block popups via onclick
        document.addEventListener('click', function(e) {
            const target = e.target;
            if (target.tagName === 'A' && target.target === '_blank') {
                e.preventDefault();
                e.stopPropagation();
            }
        }, true);
        
        // Remove suspicious elements periodically
        setInterval(function() {
            document.querySelectorAll('[onclick*="open"], [onclick*="popup"]').forEach(el => {
                el.removeAttribute('onclick');
            });
            document.querySelectorAll('a[target="_blank"]').forEach(el => {
                if (!el.href.includes(window.location.host)) {
                    el.removeAttribute('href');
                    el.removeAttribute('target');
                }
            });
        }, 1000);
    })();
`;

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
            const actualPlayerUrl = playerUrl.trim();
            
            // Try to fetch the actual player content and inject ad-blocking
            try {
                const playerResponse = await fetch(actualPlayerUrl, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                        'Referer': baseUrl,
                    },
                });
                
                if (playerResponse.ok) {
                    let html = await playerResponse.text();
                    
                    // Inject ad-blocking CSS before </head>
                    html = html.replace('</head>', `<style>${AD_BLOCKING_CSS}</style></head>`);
                    
                    // Inject ad-blocking JS before </body>
                    html = html.replace('</body>', `<script>${AD_BLOCKING_JS}</script></body>`);
                    
                    // Add viewport meta for mobile responsiveness
                    if (!html.includes('viewport')) {
                        html = html.replace('<head>', '<head><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">');
                    }
                    
                    return new NextResponse(html, {
                        status: 200,
                        headers: {
                            'Content-Type': 'text/html; charset=utf-8',
                            'X-Frame-Options': 'SAMEORIGIN',
                        },
                    });
                }
            } catch {
                // If fetching player content fails, fall back to redirect
            }
            
            // Fallback: redirect to the actual player
            return NextResponse.redirect(actualPlayerUrl);
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
