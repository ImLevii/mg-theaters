import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const id = searchParams.get('id');
        const type = searchParams.get('type');
        const season = searchParams.get('season');
        const episode = searchParams.get('episode');

        if (!id) {
            return new NextResponse('Missing id parameter', { status: 400 });
        }

        let targetUrl = `https://www.2embed.cc/embed/${id}`;
        if (type === 'tv') {
            targetUrl += `/${season}/${episode}`;
        }

        const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="referrer" content="no-referrer">
    <title>VadedTV Player</title>
    <style>
        *, *::before, *::after { box-sizing: border-box; }
        body, html { 
            margin: 0; 
            padding: 0; 
            width: 100%; 
            height: 100%; 
            overflow: hidden; 
            background-color: #000;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            user-select: none;
        }
        iframe { 
            width: 100%; 
            height: 100%; 
            border: none; 
            display: block;
        }
        /* Block common ad elements */
        .ad, .ads, .advertisement, [class*="popup"], [class*="overlay"], 
        [id*="popup"], [id*="overlay"], [class*="modal"], [id*="modal"],
        [class*="banner"], [id*="banner"] {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
        }
    </style>
</head>
<body>
    <iframe 
        src="${targetUrl}" 
        sandbox="allow-scripts allow-same-origin allow-forms allow-presentation allow-popups-to-escape-sandbox" 
        allowfullscreen 
        scrolling="no" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
    ></iframe>
    <script>
        // Block popups and new windows
        window.open = function() { return null; };
        
        // Prevent context menu
        document.addEventListener('contextmenu', function(e) { e.preventDefault(); });
        
        // Block common ad-related events
        ['click', 'mousedown', 'mouseup', 'touchstart', 'touchend'].forEach(function(event) {
            document.addEventListener(event, function(e) {
                if (e.target.tagName === 'A' && e.target.target === '_blank') {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }, true);
        });
    </script>
</body>
</html>
        `;

        return new NextResponse(html, {
            headers: {
                'Content-Type': 'text/html',
                'X-Frame-Options': 'SAMEORIGIN',
                'Content-Security-Policy': "default-src 'self' https: data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; frame-src https:; media-src https: blob:;",
            },
        });
    } catch (error) {
        console.error('Error in 2Embed proxy:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
