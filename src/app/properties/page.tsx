"use client";
import { error } from "console";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
  bedrooms?: number;
  bathrooms?: number;
  images?: string[];
  main_image?: string | null;
};

type WriteAndSearch = {
  searching: (e: React.ChangeEvent<HTMLInputElement>) => void;
  writing: string;
  applyFilters: () => void;
  onFocus: () => void;
  onBlur: () => void;
};

// Componente JSX Para mostrar barra de busqueda con parametros dinamicos
const SearchBar = ({
  writing,
  searching,
  applyFilters,
  onFocus,
  onBlur,
}: WriteAndSearch) => {
  return (
    <div className="flex justify-center items-center h-17 w-[90%] border border-gray-400 bg-blue-100 rounded">
      <div className="flex-[4] flex items-center rounded  md:pe-5 md:justify-between">
        <input
          onChange={searching}
          value={writing}
          className="text-[15px] ps-3 w-[77%] outline-none"
          type="text"
          placeholder="I'm looking for a new flat..."
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <button
          onClick={applyFilters}
          className="
              px-3 py-2 transition-all duration-300
              hover:opacity-90 bg-[#232BC2] rounded 
              md:px-5
            "
        >
          <Search strokeWidth={1.5} width={22} height={28} color="white" />
        </button>
      </div>
    </div>
  );
};

export const Properties = () => {
  // =========================================================================================================
  //                               ↓                   S T A T E S                 ↓
  // =========================================================================================================

  // Estados Para busqueda
  const [ogData, setOgData] = useState<Character[]>([]);

  // Estado propiedades de Supabase
  const [property, setProperty] = useState<ApartmentProperty[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados de la Unsplash API
  const [apartments, setApartments] = useState<ApartmentProperty[]>([]);

  // Estados de control/resultado de busqueda
  const [writing, setWriting] = useState("");
  const [getSearch, setGetSearch] = useState<ApartmentProperty[]>([]);
  const [noSearch, setNoSearch] = useState<Character[]>([]);

  // Estados para controlar divs con blur animation
  const [isFocused, setIsFocused] = useState(false);

  // =========================================================================================================
  //                ↓                     M A I N      C A L L S                   ↓
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
  const cleanValue = writing.toLowerCase().trim();

  const resolve = property.filter((unit) => {
    const searchableText = `
      ${unit.title ?? ""}
      ${unit.description ?? ""}
      ${unit.price ?? ""}
      ${unit.bedrooms ?? ""}
      ${unit.bathrooms ?? ""}
    `
      .toLowerCase()
      .replace(/\s+/g, " ");

    return searchableText.includes(cleanValue);
  });

  setGetSearch(resolve);
};

  // Evento cada vez que escribo
  const searching = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setWriting(value);
    // ojo que lo que actualice aqui con el set Afecta INMEDIATAMENTE al value de mi input
  };

  // =========================================================================================================
  //                ↓                   R E N D E R     H E L P E R S                 ↓
  // =========================================================================================================

  // No colocar componentes aqui

  // JSX para mostrar contenido de busqueda / Parametro Dinamico
  const renderCards = (data: ApartmentProperty[]) => {
  return data.map((unit, index) => {
    // BADGES RANDOM (solo visual)
    const typeBadge = Math.random() > 0.5 ? "Apartment" : "Studio";
    const statusBadge = Math.random() > 0.5 ? "Available" : "Rented";
    const area = Math.floor(Math.random() * (160 - 30 + 1)) + 30;

    return (
      <Link key={unit.id} href={`/properties/${unit.id}`} className="block">
        <article
          className="
            bg-white rounded-xl overflow-hidden
            shadow-sm hover:shadow-md
            transition-shadow duration-300
            cursor-pointer
          "
        >
          {/* Imagen + Badges */}
          <div className="relative">
            <img
              src={
                unit.main_image ||
                apartments[index]?.urls?.regular ||
                "/placeholder.jpg"
              }
              alt={unit.title || "Property image"}
              className="w-full h-48 object-cover"
            />

            {/* Badge LEFT */}
            <span
              className="
                absolute top-3 left-3
                bg-blue-600 text-white
                text-xs font-semibold
                px-3 py-1 rounded-full
              "
            >
              {typeBadge}
            </span>

            {/* Badge RIGHT */}
            <span
              className={`
                absolute top-3 right-3
                text-white text-xs font-semibold
                px-3 py-1 rounded-full
                ${
                  statusBadge === "Available"
                    ? "bg-green-600"
                    : "bg-red-600"
                }
              `}
            >
              {statusBadge}
            </span>
          </div>

          {/* Contenido */}
          <div className="p-4 space-y-5">
            <h2 className="font-bold">
              {unit.title || "Property"}
            </h2>

            {/* Features */}
            <div className="text-sm flex gap-8">
              <div className="flex gap-1 items-center">
                <Bath size={16} />
                <span>{unit.bathrooms ?? 1} Baths</span>
              </div>
              <div className="flex gap-1 items-center">
                <BedSingle size={16} />
                <span>{unit.bedrooms ?? 1} Beds</span>
              </div>
              <div className="flex gap-1 items-center">
                <Landmark size={16} />
                <span>{area} m²</span>
              </div>
            </div>

            {/* Precio */}
            <div className="flex justify-between items-center">
              <p className="text-blue-800 font-bold">
                £ {unit.price?.toLocaleString()}
              </p>
              <span className="text-sm text-blue-600">
                View Details →
              </span>
            </div>
          </div>
        </article>
      </Link>
      );
    });
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
    <section className="h-full w-full">
      {/* Buy / Sell ( Solo desktop )*/}
      <div className="hidden mt-10 ms-6  md:flex ">
        <div
          className="
          transition-colors ease-in-out duration-250
        bg-blue-200 hover:bg-blue-300
          border border-solid border-gray-400
          min-w-25 ps-8 py-2"
        >
          Buy
        </div>
        <div className="min-w-25 border border-solid border-gray-400 bg-[#232BC2] text-white ps-8 py-2">
          Rent
        </div>
      </div>

      {/* Logo hacia Home ( Solo Movil ) */}
      <div className="md:hidden relative z-80 h-40 w-40 ">
        <Link href={"/"}>
          <Image fill alt="Main Logo Image" src={"/logo-brand.png"} />
        </Link>
      </div>
      {/* START */}

      {/* Seccion Barra de busqueda && Filter Box*/}
      <div className="flex items-center mx-3 gap-2">
        {/* Fondo GLOW para Barra de busqueda ( Left Children )*/}
        <div
          className={`hidden md:block md:w-[55%] ps-3 pt-1  transition-all duration-500 ease-in-out 
            ${
              isFocused
                ? "h-40 shadow-[0_0_12px_3px_#7c90e5]"
                : "h-20 shadow-none"
            }
          `}
        >
          <SearchBar
            searching={searching}
            writing={writing}
            applyFilters={applyFilters}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>
        {/* Barra de busqueda normal ( Movil Sin glow ) */}
        <div className="md:hidden w-[79%] ">
          <SearchBar
            searching={searching}
            writing={writing}
            applyFilters={applyFilters}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
        </div>
        {/* Filter Box ( Right Children ) */}
        <div
          className="
          flex-[1] md:flex-none md:w-49
          flex justify-center items-center h-13
          bg-[#D9D9D9] border border-solid border-blue-900 rounded-2xl
           md:ml-auto md:gap-5 md:rounded-none
          "
        >
          <label className="hidden md:block" htmlFor="">
            Filter Properties
          </label>
          <SlidersHorizontal height={24} width={24} />
        </div>
      </div>

      {/* END  */}

      {/* ACA Sort By etc*/}
      <div className="mt-4 ms-6 space-y-3 rounded-md md:flex md:justify-between">
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
        grid grid-cols-1 md:grid-cols-4 gap-5 
        mt-4 h-100 mx-5
      "
      >
        {content}
      </div>
    </section>
  );
};
export default Properties;
