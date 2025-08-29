import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = "https://api.unsplash.com/search/photos?page=1&query=";
  const query = req.nextUrl.searchParams.get("query") || "apartment"; // buscamos el parametro mas importante = Query
  // Ahora sip, call a la API
  // encodeURIComponent para evitar caracteres raros de los usuarios en la URL
  try {
    const res = await fetch(
      `${url}${encodeURIComponent(query)}`, // 2 Argumentos de Fetch
      {
        // headers : { bearer : xxxxxxx}
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY!}`,
        },
        cache: "no-store",
      }
    );

    if (!res) {
      return NextResponse.json({ error: "API error" }, { status: 500 });
    }
    if (!res.ok) {
      return NextResponse.json(
        { error: `Error en la API Unsplash OAuth ${res.status}` },
        { status: res.status }
      );
    }

    const data = await res.json(); // Si existe lo convertimos a json para leerlo en el frontend

    return NextResponse.json(data, { status: 200 }); // Otra vez convertimos a json
    // en respuesta para darselo al frontend como respuesta HTTP
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error interno del backend Unsplash");
    }
  }
}
