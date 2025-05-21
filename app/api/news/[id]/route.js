import { NextResponse } from 'next/server';

// app/api/news/[id]/route.js

const data = [
  { id: '1', judul: 'Berita 1', isi: 'Isi berita 1' },
  { id: '2', judul: 'Berita 2', isi: 'Isi berita 2' },
  // Tambahkan sesuai data kamu
];

export async function GET(request, { params }) {
  const { id } = params;
  const berita = data.find((item) => item.id === id);

  if (!berita) {
    return new Response(JSON.stringify({ message: 'Berita tidak ditemukan' }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(berita), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function PUT(request, { params }) {
  const { id } = params;
  const body = await request.json();
  const { judul, isi } = body;

  // Cek apakah berita dengan ID tersebut ada
  const beritaIndex = data.findIndex((item) => item.id === id);

  if (beritaIndex === -1) {
    return new Response(JSON.stringify({ message: 'Berita tidak ditemukan' }), {
      status: 404,
    });
  }

  // Update data
  data[beritaIndex] = { id, judul, isi };

  return new Response(JSON.stringify({ message: 'Berhasil diupdate', data: data[beritaIndex] }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

