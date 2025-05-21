async function getRSSData() {
  const res = await fetch('http://localhost:3000/api/rss/semua', {
    cache: 'no-store', // agar data selalu fresh
  });

  if (!res.ok) {
    throw new Error('Gagal mengambil data RSS');
  }

  return res.json();
}

export default async function PortalBerita() {
  const data = await getRSSData();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Berita dari Portal Eksternal</h1>
      <div className="grid gap-4">
        {data.map((item) => (
          <div key={item.id} className="border rounded p-4 shadow-sm">
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-sm text-gray-500">{item.pubDate} - {item.source}</p>
            <p className="mt-2">{item.snippet}</p>
            <a href={item.link} target="_blank" className="text-blue-600 hover:underline mt-2 inline-block">
              Baca selengkapnya
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
