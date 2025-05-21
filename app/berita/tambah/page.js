'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TambahBerita() {
  const router = useRouter();
  const [judul, setJudul] = useState('');
  const [isi, setIsi] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ judul, isi }),
      });

      if (!res.ok) throw new Error('Gagal menambah berita');

      alert('Berita berhasil ditambahkan!');
      router.push('/');
    } catch (error) {
      console.error(error);
      alert('Gagal menambah berita.');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-2xl border border-blue-100">
        <h1 className="text-4xl font-extrabold mb-10 text-center text-blue-700 flex items-center justify-center gap-2">
          <span role="img" aria-label="news">📰</span> Tambah Berita Baru
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
             <div style={{ padding: '1rem' }}></div>
            <label className="text-sm font-semibold text-blue-700 mb-2">Judul</label>
            <input
              type="text"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              className="px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
              placeholder="Masukkan judul berita"
              required
            />
          </div>
          <div className="flex flex-col">
             <div style={{ marginTop: '1rem' }}>
            <label className="text-sm font-semibold text-blue-700 mb-2">Isi Berita</label>
            <textarea
              value={isi}
              onChange={(e) => setIsi(e.target.value)}
              className="px-5 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
              rows={6}
              placeholder="Tulis isi berita di sini..."
              required
            />
            </div>
          </div>
          <div className="text-right">
            <div style={{ marginTop: '1rem' }}></div>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
            >
              ➕ Tambah Berita
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
