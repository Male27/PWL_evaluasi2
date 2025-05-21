import Parser from 'rss-parser';

const parser = new Parser();

function formatDate(pubDate) {
  const date = new Date(pubDate);
  return date.toLocaleString('id-ID', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Jakarta',
  });
}

function truncateTitle(title, maxLength = 100) {
  return title.length > maxLength ? title.slice(0, maxLength) + '...' : title;
}

export async function GET() {
  try {
    const [bbc, tempo, kompas] = await Promise.all([
      parser.parseURL('https://feeds.bbci.co.uk/news/rss.xml'),
      parser.parseURL('https://rss.tempo.co/nasional'),
      parser.parseURL('https://www.voaindonesia.com/api/epiqq'),
    ]);

    const articles = [
      ...bbc.items.slice(0, 5).map((item, i) => ({
        id: `bbc-${i}`,
        title: truncateTitle(item.title),
        snippet: item.contentSnippet || '',
        pubDate: formatDate(item.pubDate),
        source: 'BBC',
        link: item.link,
        image: null,
      })),
      ...tempo.items.slice(0, 5).map((item, i) => ({
        id: `tempo-${i}`,
        title: truncateTitle(item.title),
        snippet: item.contentSnippet || '',
        pubDate: formatDate(item.pubDate),
        source: 'Tempo',
        link: item.link,
        image: null,
      })),
      ...kompas.items.slice(0, 5).map((item, i) => ({
        id: `voa-${i}`,
        title: truncateTitle(item.title),
        snippet: item.contentSnippet || '',
        pubDate: formatDate(item.pubDate),
        source: 'Voa',
        link: item.link,
        image: null,
      })),
    ];

    return new Response(JSON.stringify(articles), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error("Gagal mengambil RSS:", error.message);
    return new Response(JSON.stringify({ message: 'Gagal mengambil RSS feed', detail: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}
