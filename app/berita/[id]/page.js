import { notFound } from "next/navigation";

export default async function DetailBerita({ params }) {
  const { id } = params;

  let berita = null;

  try {
    const res = await fetch(`http://localhost:3000/api/news/${id}`, {
  cache: 'no-store',
});
    if (!res.ok) return notFound();

    berita = await res.json();
  } catch (error) {
    console.error("Gagal mengambil data berita:", error);
    return notFound();
  }

  if (!berita) return notFound();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">{berita.judul}</h1>
      <p>{berita.isi}</p>
    </main>
  );
}
