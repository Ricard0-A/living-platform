"use client";
import { error } from "console";
import { Type } from "lucide-react";
import { useEffect, useState } from "react";

// Types
type Character = {
  id: number;
  name: string;
  image: string;
};

type Apartment = {
  id: number;
  alt_description: string;
  urls: {
    full: string;
    regular: string;
    small: string;
  };
};

// 1- Se llama a la API.
// 2- Se evalúa si el usuario ha hecho una búsqueda.
//    Si es así, se mapea esa búsqueda (nos dará un array con los resultados de la búsqueda).
// 3- Si no, se mapean los datos de la API original (la API se llama sí o sí).
// 3.5- El algoritmo permite que el usuario pueda volver a buscar otro dato o, si no hace ninguna búsqueda,
// reiniciamos el estado que contiene la información de la búsqueda anterior.
// Al reiniciarlo, ya tenemos en los condicionales un respaldo por si el dato está vacío,
// de modo que se muestre todo el dataset completo sin filtros.
// 4- En cualquier error, tendremos un JSX de respaldo + type hints.

export const Properties = () => {
  const baseUrl = "https://rickandmortyapi.com/api";

  // Estados Para busqueda
  const [ogData, setOgData] = useState<Character[]>([]);
  //  sin filtros en caso  de que no haya busqueda

  // Estados de control/resultado de busqueda
  const [writing, setWriting] = useState("");
  const [getSearch, setGetSearch] = useState<Apartment[]>([]);
  const [noSearch, setNoSearch] = useState<Character[]>([]);

  // Estados de la Unsplash API
  const [apartments, setApartments] = useState<Apartment[]>([]);
  // Handler Unplash API
  const getApiImages = async () => {
    try {
      const response = await fetch("api/unsplash");

      // Si deseo traer el mensaje del backend, toca hacerle json
      // Si no, puedo jugar con los http responses sin hacerle json
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error desde el backend", errorData.error);
        throw new Error(`HTTP Error ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log("Datos de la API Unsplash recibido", data);
      console.log(data);
      setApartments(data.results);
    } catch (error) {
      if (error instanceof Error) {
        // Tambien ( error as Error ) TS lo necesita
        console.log("Error Message:", error.message);
        console.log("Error Linea de codigo:", error.stack);
      } else console.log("Error desconocido", error);
    }
  };
  // =========================================================================================================
  //                ↓                   E V E N T     H A N D L E R S                  ↓
  // =========================================================================================================

  // Aplica los filtros ( Se evalua con o sin busqueda )
  const applyFilters = () => {
    if (writing) filterSearch();
    else {
      console.log("Perfecto, no hay busqueda", writing);
      setNoSearch(ogData);
      setGetSearch([]);
    }
  };

  // Busqueda
  const filterSearch = () => {
    const cleanValue = writing.toLowerCase().replace(/\s/g, "");
    const resolve = apartments?.filter((unit) =>
      (unit.alt_description ?? "")
        .toLowerCase()
        .replace(/\s/g, "")
        .includes(cleanValue)
    );
    console.log(resolve);
    if (resolve) setGetSearch(resolve);
    else {
      console.log("No hubo busqueda");
      return [];
    }
  };

  const searching = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setWriting(value);
    // ojo que lo que actualice aqui con el set Afecta INMEDIATAMENTE al value de mi input
  };

  // =========================================================================================================
  //                ↓                   R E N D E R     H E L P E R S                 ↓
  // =========================================================================================================

  // JSX para mostrar contenido de busqueda / Parametro Dinamico
  const renderCards = (data: Apartment[]) => {
    return data.map((unit) => (
      <div
        key={unit?.id}
        className="bg-blue-500 h-99 border-2 border-green-400 border-solid"
      >
        <img src={unit?.urls.full} alt="Character Image" />
        <h3> Description : {unit?.alt_description} </h3>
        <p>|||||||||||||||||</p>
        <p>|||||||||||||||||</p>
      </div>
    ));
  };

  // =========================================================================================================
  //                ↓                   R E N D E R     L O G I C                   ↓
  // =========================================================================================================

  // Tener cuidado con este let que no es escalable por falta de useState
  let content;

  if (getSearch?.length > 0) content = renderCards(getSearch);
  else if (apartments?.length > 0) content = renderCards(apartments);
  else {
    content = (
      <div>
        <h1 className="text-green-400 text-3xl font-bold mt-10">
          Oops! It seems this place is empty
          <p className="text-gray-500 text-sm">
            Don't worry! Try again from the home page."
          </p>
        </h1>
      </div>
    );
  }

  // =========================================================================================================
  //                        ↓                       E F F E C T S                      ↓
  // =========================================================================================================

  useEffect(() => {
    getApiImages();
  }, []);

  useEffect(() => {
    console.log("STOP");
  }, [content]);

  return (
    <section className="bg-gray-200 h-full w-full">
      {/* Barra de busqueda  */}
      <div
        className="
        flex justify-center items-center mx-auto h-15 w-[39%]
        bg-gradient-to-r from-green-800 to-green-500 rounded"
      >
        <div className="flex items-center h-10 w-[95%] ps-3 bg-gray-900 rounded">
          <input
            onChange={searching}
            value={writing}
            className="w-[90%]  outline-none"
            type="text"
            placeholder="I'm looking for a new flat..."
          />
          <button
            onClick={applyFilters}
            className="px-3 py-2  hover:opacity-90 bg-green-400 rounded"
          >
            Send
          </button>
        </div>
      </div>
      {/* GRIDS  */}
      <div className="grid grid-cols-3 h-400 w-400 bg-amber-300">{content}</div>
    </section>
  );
};

export default Properties;

// ==========================
