export default async function NewsPage() {
  const news = [
    { id: 1, title: "Berita 1", content: "Isi berita 1" },
    { id: 2, title: "Berita 2", content: "Isi berita 2" },
  ];

  return (
    <main>
      <h1>Daftar Berita</h1>
      <ul>
        {news.map((item) => (
          <li key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.content}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
