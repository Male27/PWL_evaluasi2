'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditBeritaPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [isLoading, setIsLoading] = useState(true);
const [judul, setJudul] = useState('');
const [isi, setIsi] = useState('');

useEffect(() => {
  console.log("Memulai fetch berita...");

  fetch(`/api/news/${params.id}`)
    .then((res) => {
      console.log("Response status:", res.status);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log("Data berita:", data);
      setJudul(data.judul);
      setIsi(data.isi);
      setIsLoading(false); 
    })
    .catch((err) => {
      console.error("Gagal mengambil data:", err.message);
      alert("Gagal memuat data berita.");
    });
}, [params.id]);

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch(`/api/news/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ judul, isi }),
    });

    const result = await res.json(); // tambahkan ini untuk melihat response dari server
    console.log("Response status:", res.status);
    console.log("Response body:", result);

    if (res.ok) {
      alert('Berhasil menyimpan perubahan.');
      router.push('/');
    } else {
      alert('Gagal menyimpan perubahan.');
    }
  } catch (err) {
    console.error('Terjadi error saat menyimpan:', err);
    alert('Terjadi kesalahan saat mengirim data.');
  }
};

  if (isLoading) return <p>Loading...</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Edit Berita</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Judul:</label><br />
          <input
            type="text"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
            required
            style={{ width: '30%', padding: '0.5rem' }}
          />
        </div>
        <div style={{ marginTop: '1rem' }}>
          <label>Isi:</label><br />
          <textarea
            value={isi}
            onChange={(e) => setIsi(e.target.value)}
            required
            rows={7}
            style={{ width: '50%', padding: '0.5rem' }}
          />
        </div>
        <button
          type="submit"
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}
