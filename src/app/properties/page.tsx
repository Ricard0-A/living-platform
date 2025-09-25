"use client";
import { error } from "console";
import { useEffect, useState } from "react";
import Image from "next/image";

// Lucide-React
import { Search } from "lucide-react";
import { SlidersHorizontal } from "lucide-react";

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

    console.log("Esto viene de FilterSearch", resolve);
    if (resolve) {
      setGetSearch(resolve);
      console.log(getSearch);
    } else {
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
        className="bg-blue-500 h-99 border-2 border-b-amber-200 border-solid"
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
    <section className="bg-gray-100 h-full w-full">
      {/* Logo Principal al lado del Bars  */}
      <div className="z-80 relative h-45 w-45">
        <Image fill alt="Main Logo" src={"/logo-brand.png"} />
      </div>
      {/* Barra de busqueda && Filter Box*/}
      <div className="flex items-center mx-3 gap-3">
        {/* Barra de busqueda - Main  */}
        <div
          className="
        flex justify-center items-center  h-18 w-[77%]
        border-1 border-solid border-blue-500 bg-blue-100 rounded-2xl "
        >
          {/* Barra de busqueda - Box */}
          <div className="flex-[4] flex items-center rounded">
            {/* Input */}
            <input
              onChange={searching}
              value={writing}
              className="text-md ps-3 w-[77%] outline-none"
              type="text"
              placeholder="I'm looking for a new flat..."
            />
            <button
              onClick={applyFilters}
              className="px-4 py-2  hover:opacity-90 bg-[#232BC2] rounded"
            >
              <Search strokeWidth={1.5} width={22} height={28} color="white" />
            </button>
          </div>
        </div>
        {/* Filter Box */}
        <div className="flex-[1] h-15 flex justify-center items-center bg-[#D9D9D9] border border-solid border-blue-500 rounded-2xl">
          <SlidersHorizontal height={28} width={28} />
        </div>
      </div>

      {/* GRIDS  */}
      <div className="mt-10 grid grid-cols-3 h-400 w-400 bg-amber-300">
        {content}
      </div>
    </section>
  );
};

export default Properties;
