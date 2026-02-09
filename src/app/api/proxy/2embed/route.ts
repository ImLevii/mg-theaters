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
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="referrer" content="no-referrer">
    <title>VadedTV Player</title>
    <style>
        body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background-color: #000; }
        iframe { width: 100%; height: 100%; border: none; }
    </style>
</head>
<body>
    <iframe src="${targetUrl}" sandbox="allow-scripts allow-same-origin allow-forms allow-presentation" allowfullscreen scrolling="no" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
</body>
</html>
        `;

        return new NextResponse(html, {
            headers: {
                'Content-Type': 'text/html',
            },
        });
    } catch (error) {
        console.error('Error in 2Embed proxy:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
