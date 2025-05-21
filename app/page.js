
'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
      return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Portal Berita</h1>
      <div className="space-y-4">
        <Link href="/berita/tambah" className="text-blue-500 hover:underline">
          ➕ Tambah Berita
        </Link>
        <br />
        <Link href="/berita/portal" className="text-blue-500 hover:underline">
          🌐 Berita dari Portal Eksternal
        </Link>
      </div>
    </main>
  );
  const [beritaList, setBeritaList] = useState([]);

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const res = await fetch('/api/news');
        const data = await res.json();
        setBeritaList(data);
      } catch (error) {
        console.error('Gagal mengambil data berita:', error);
      }
    };

    fetchBerita();
  }, []);

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Daftar Berita</h1>
      <ul className="space-y-4">
        {beritaList.map((berita) => (
          <li key={berita.id} className="border p-4 rounded shadow">
            <Link href={`/berita/${berita.id}`}>
              <h2 className="text-lg font-semibold hover:underline">{berita.judul}</h2>
            </Link>
            <p className="text-sm text-gray-600 truncate">{berita.isi}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
