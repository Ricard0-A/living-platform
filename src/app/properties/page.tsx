"use client";
import { error } from "console";
import { useEffect, useState } from "react";
import Image from "next/image";

// Lucide-React
import { Search } from "lucide-react";
import { SlidersHorizontal } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { Bath } from "lucide-react";
import { BedSingle } from "lucide-react";
import { Landmark } from "lucide-react";

// SUPABASE
import { supabase } from "@/lib/supabaseClient";

// Types
type Character = {
  id: number;
  name: string;
  image: string;
};

type ApartmentProperty = {
  id: number;
  // Type para Unsplash API (opcionales porque Supabase no las tiene)
  alt_description?: string;
  urls?: {
    full: string;
    regular: string;
    small: string;
  };
  // Type para Supabase (opcionales porque Unsplash no las tiene)
  title?: string;
  price?: number;
  description?: string;
};

export const Properties = () => {
  const baseUrl = "https://rickandmortyapi.com/api";

  // Estados Para busqueda
  const [ogData, setOgData] = useState<Character[]>([]);

  // Estado propiedades de Supabase
  const [property, setProperty] = useState<ApartmentProperty[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados de control/resultado de busqueda
  const [writing, setWriting] = useState("");
  const [getSearch, setGetSearch] = useState<ApartmentProperty[]>([]);
  const [noSearch, setNoSearch] = useState<Character[]>([]);

  // Estados de la Unsplash API
  const [apartments, setApartments] = useState<ApartmentProperty[]>([]);

  // =========================================================================================================
  //                ↓                    M A I N      C A L L S                   ↓
  // =========================================================================================================

  // Trae datos de tablas SUPABASE
  const fetchProperties = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("properties").select("*");

      // Manejo de errores
      if (error) console.error("Fetch error a Supabase", error?.message);
      if (!data)
        console.warn(
          "Data del fetch retorna valores falsy ( Null, undefined )"
        );
      if (!data?.length)
        console.warn("Data del fetch exitoso, pero es un array vacio []");

      // Resultados optimos
      setProperty(data as ApartmentProperty[]);
      console.info("Exito, tenemos datos del registro", data);
      setLoading(false); // Esto es para backup UI mientras no llega datos aun
    } catch (error) {
      console.log("Error interno de supabase", error);
    }
  };

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
    const resolve = property?.filter(
      (unit) =>
        (unit.description ?? "")
          .toLowerCase()
          .replace(/\s/g, "")
          .includes(cleanValue) // Comparacion
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
  const renderCards = (data: ApartmentProperty[]) => {
    return data.map((unit, index) => (
      <article
        key={unit?.id}
        className="
        bg-white rounded-xl py-4 shadow-sm
        hover:shadow-md transition-shadow duration-300
        "
      >
        {/* Imagen */}
        <img
          src={apartments[index]?.urls?.regular}
          alt={`Image of ${unit?.title}`}
          className="w-full h-48 px-2 object-cover bg-cover"
        />

        {/* Contenido */}
        <div className="p-4 space-y-5">
          <div className="w-full">
            <h2 className="break-words font-bold">
              Newtty One - London Bridge Street, London, S34453
            </h2>
          </div>
          {/* Bath, Bed, squarefeets  */}
          <div className="text-sm flex gap-12">
            <div className="flex gap-1">
              <Bath />
              <span>2</span>
              <span>Baths</span>
            </div>
            <div className="flex gap-1">
              <BedSingle />
              <span>2</span>
              <span>Beds</span>
            </div>
            <div className="flex gap-1">
              <Landmark />
              <span>3540,22 sqfts</span>
            </div>
          </div>
          {/* Precio */}
          <div className="flex justify-between items-center">
            <p className="text-blue-800 font-bold text-base">
              £ {unit?.price?.toLocaleString()}
            </p>
            <button className="text-sm text-blue-600 hover:underline">
              View Details
            </button>
          </div>
        </div>
      </article>
    ));
  };

  // =========================================================================================================
  //                ↓                   R E N D E R     L O G I C                   ↓
  // =========================================================================================================

  // Tener cuidado con este let que no es escalable por falta de useState
  let content;
  // getSearch ahora busca en property pero sigue buscando
  // by word solo el description
  if (getSearch?.length > 0) content = renderCards(getSearch);
  else if (property?.length > 0) content = renderCards(property);
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
    fetchProperties();
  }, []);

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

      {/* ACA Sort By etc*/}
      <div className="mt-8 mx-3  space-y-3 p-2 rounded-md">
        {/* Header info */}
        <div>
          <span className="font-bold text-blue-900">1 - 20 of 3500</span>
          <span className="ml-1 text-gray-900">Properties in UK</span>
        </div>

        {/* Sort section */}
        <div className="flex items-center gap-2">
          <label className="text-gray-800 font-medium">Sort by:</label>
          <button
            type="button"
            className="flex items-center gap-1 text-blue-900 hover:text-blue-700 transition"
          >
            <span>Most Recent</span>
            <ChevronDown height={18} width={18} color="#352175" />
          </button>
        </div>
      </div>

      {/* GRIDS  */}
      <div
        className="
        grid grid-cols-1 md:grid-cols-3 
        mt-7 h-100 w-100 bg-amber-300
      "
      >
        {content}
      </div>
    </section>
  );
};
export default Properties;
