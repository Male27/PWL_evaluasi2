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
    const feed = await parser.parseURL('https://www.voaindonesia.com/api/epiqq');

    const articles = feed.items.slice(0, 10).map((item, index) => ({
        id: `cnn-${index}`,
        title: truncateTitle(item.title),
        snippet: item.contentSnippet || '',
        pubDate: formatDate(item.pubDate),
        source: 'CNN',
        image: null, 
        link: item.link,
    }));


    return new Response(JSON.stringify(articles), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify(articles), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
    });
  }
}
