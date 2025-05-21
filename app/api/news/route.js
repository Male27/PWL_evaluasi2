import { NextResponse } from 'next/server';

let newsList = [
  { id: 1, judul: 'Berita Satu', isi: 'Isi berita satu' },
  { id: 2, judul: 'Berita Dua', isi: 'Isi berita dua' },
];

export async function GET() {
  return NextResponse.json(newsList);
}

export async function POST(request) {
  const body = await request.json();
  const { judul, isi } = body;

  if (!judul || !isi) {
    return NextResponse.json({ message: 'Judul dan isi wajib diisi' }, { status: 400 });
  }

  const newItem = {
    id: newsList.length + 1,
    judul,
    isi,
  };

  newsList.push(newItem);

  return NextResponse.json(newItem, { status: 201 });
}

export async function PUT(request, { params }) {
  const { id } = params;
  const body = await request.json();
  const { judul, isi } = body;

  const beritaIndex = newsList.findIndex((item) => item.id === parseInt(id));
  if (beritaIndex === -1) {
    return NextResponse.json({ message: 'Berita tidak ditemukan' }, { status: 404 });
  }

  newsList[beritaIndex] = {
    ...newsList[beritaIndex],
    judul,
    isi,
  };

  return NextResponse.json(newsList[beritaIndex]);
}