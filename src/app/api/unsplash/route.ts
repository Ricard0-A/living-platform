import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // query de búsqueda (apartments por defecto)
  const query = req.nextUrl.searchParams.get("query") || "apartment";

  // página (para traer más resultados)
  const page = req.nextUrl.searchParams.get("page") || "1";

  // cuántas imágenes traer
  const perPage = req.nextUrl.searchParams.get("per_page") || "10";

  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        query
      )}&page=${page}&per_page=${perPage}`,
      {
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY!}`,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: `Unsplash error ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
