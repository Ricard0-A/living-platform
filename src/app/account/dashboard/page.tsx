"use client";
import { useRef, useState, useEffect } from "react"; 
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  // Constante Ref para acceder al contenedor principal con el fin de scroll
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showArrows, setShowArrows] = useState(false); // Controlo si se muestran las flechas
  const [activeIndex, setActiveIndex] = useState(0); // Estado para saber en qué slide estamos
  const isGoingToIntro = useRef(false); // Estado bandera para anular flechas al llegar a intro
  
  // Detectar cuando volvemos al INTRO y calcular el índice activo
  useEffect(() => {
    const container = sectionRef.current; // Nodo DOM 
    if (!container) return; // Limpiar

    const handleScrollCheck = () => {
       const width = container.clientWidth;
       const currentScroll = container.scrollLeft;

       // Calcular el índice actual basado en el scroll para las bolitas
       const index = Math.round(currentScroll / width);
       setActiveIndex(index);

       // Si scrollLeft es menor a 50px, estamos en el INTRO
      if (currentScroll < 50) {
        setShowArrows(false);
        isGoingToIntro.current = false;  // Resetear bandera
      } else if (!isGoingToIntro.current) {
        // Solo mostrar flechas si NO estamos yendo al INTRO
        setShowArrows(true);
      }
    };

    // Usamos scrollend para evitar el delay
    container.addEventListener("scrollend", handleScrollCheck);
    // También escuchamos scroll para casos donde scrollend no se dispare
    container.addEventListener("scroll", handleScrollCheck);
    
    return () => {
      container.removeEventListener("scrollend", handleScrollCheck);
      container.removeEventListener("scroll", handleScrollCheck);
    };
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    // Container es igual al nodo del DOM y ahora puede acceder a cosas como .focus() etc 
    const container = sectionRef.current;
    if (!container) return;

    const width = container.clientWidth;
    
    // Si vamos hacia la izquierda y estamos cerca del inicio, ocultar flechas inmediatamente
    if (direction === "left" && container.scrollLeft < width * 1.5) {
      isGoingToIntro.current = true; // Activar Estado Bandera
      setShowArrows(false);
    }
    
    container.scrollBy({
      left: direction === "left" ? -width : width,
      behavior: "smooth",
    });
  };

  // Función para mover el carrousel al hacer click en una bolita
  const scrollToSlide = (index: number) => {
    const container = sectionRef.current;
    if (!container) return;
    const width = container.clientWidth;
    
    container.scrollTo({
      left: index * width,
      behavior: "smooth"
    });
  };

  const handleGo = () => {
    handleScroll("right");
    // Aqui ya no va setArrowsTrue ( Se maneja todo desde useEffect )
  };

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black">
      
      <section
        ref={sectionRef}
        className="
          flex h-full w-full
          overflow-x-hidden overflow-y-hidden 
          snap-x snap-mandatory scroll-smooth"
        style={{ backgroundImage: "url(/dashboard/client-first-image.jpg)", backgroundSize: 'cover' }}
      >
        {/* Contenedor Intro */}
        <div
          className="
          w-full pt-33 relative z-10 gap-10 bg-black/70 bg-blend-darken
            snap-center flex flex-col items-center flex-shrink-0
            md:pt-0 md:justify-center"
        >
          <h1 className="text-white text-4xl ">Welcome, Visitor</h1>
          
          <div className="flex flex-col justify-center items-center px-4 gap-6 text-white md:flex-row md:gap-30">
            <div className="flex flex-col text-center gap-2 md:text-left md:text-lg">
              <strong className="text-blue-400 text-lg">
                Its great to have you here!
              </strong>
              <p className="whitespace-normal md:whitespace-pre">
                Now you can start doing what you came for. {"\n"}
                Just click the button below to choose your role
              </p>
            </div>

            <button
              className="px-4 py-2 rounded bg-[#141EE6] text-lg font-bold md:px-5 md:py-3 md:text-xl hover:bg-[#141EE6]/70"
              type="button"
              onClick={handleGo}
            >
              Go!
            </button>
          </div>
        </div>

        {/* Contenedor Buyer/Tenant + Demo Gif */}
        <div 
          className="
            snap-center flex justify-center flex-shrink-0 w-full
            px-8 pt-33 gap-10 bg-black/70 bg-blend-darken 
            md:w-auto md:items-center md:pt-0 "
          
        >
          <div className="flex flex-col items-center relative z-10 gap-2 max-w-2xl">
            <div>
              <h1 className="text-white">Buyer/Tenant</h1>
              <div className="mt-1 h-1 w-full bg-[#141EE6] rounded" />
            </div>
            
            
            <div className="pt-8 flex flex-col justify-center items-center gap-8 text-white">
              <div className="text-center md:text-lg">
                <p className="whitespace-normal">
                  Find your dream home easily. Explore all properties,
                   and keep track of your favorite listings. You can also reach out to
                  sellers directly from your dashboard.
                </p>
              </div>
              <Link href={"/account/form"}>
                <button
                  className="px-4 py-2 rounded-2xl bg-[#141EE6] text-xl font-bold md:px-5 md:py-3 hover:bg-[#141EE6]/70"
                  type="button"
                >
                  Start
                </button>
              </Link>

              
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center border-2 border-dashed border-blue-400 h-96 w-96 rounded-lg bg-black/30">
            <p className="text-white text-center p-4">
              Demo GIF para Buyers/Tenants
            </p>
          </div>
        </div>

        {/* Contenedor Seller + Demo Gif */}
        <div 
          className="
            snap-center flex justify-center flex-shrink-0
            w-full pt-33 px-8 gap-10 bg-black/70 bg-blend-darken
            md:pt-0 md:items-center"
        >
          <div className="flex flex-col items-center relative z-10 gap-2 max-w-2xl">
            <div>
              <h1 className="text-white">Seller</h1>
              <div className="mt-1 h-1 w-full bg-[#141EE6] rounded" />
            </div>
            
            
            
            <div className="pt-8 flex flex-col justify-center items-center gap-8 text-white">
              <div className="text-center md:text-lg">
                <p className="whitespace-normal">
                  Promote your properties with ease and reach serious buyers fast.
                  Add detailed listings and keep track of every interaction from
                  a single dashboard
                </p>
              </div>

              <button
                className="px-4 py-2 rounded-2xl bg-[#141EE6] text-xl font-bold md:px-5 md:py-3 hover:bg-[#141EE6]/70"
                type="button"
              >
                Start
              </button>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center border-2 border-dashed border-blue-400 h-96 w-96 rounded-lg bg-black/30">
            <p className="text-white text-center p-4">
              Demo GIF para Sellers
            </p>
          </div>
        </div>

        {/* Contenedor Landlord + Demo Gif */}
        <div 
          className="
            snap-center flex justify-center flex-shrink-0
            w-full pt-33 px-8 gap-10 bg-black/70 bg-blend-darken
            md:pt-0 md:items-center"
          
        >
          <div className="flex flex-col items-center relative z-10 gap-2 max-w-2xl">
            
            {/* Landlord  */}
            <div>
              <h1 className="text-white">Landlord</h1>
              <div className="mt-1 h-1 w-full bg-[#141EE6] rounded" />
            </div>
            
            
            
            <div className="pt-8 flex flex-col justify-center items-center gap-8 text-white">
              <div className="text-center md:text-lg">
                <p className="whitespace-normal">
                  Take full control of your rental properties in just a few steps.
                  List your apartments or houses, review tenant applications and manage
                  contracts and requests.
                </p>
              </div>

              <button
                className="px-4 py-2 rounded-2xl bg-[#141EE6] text-xl font-bold md:px-5 md:py-3 hover:bg-[#141EE6]/70"
                type="button"
              >
                Start
              </button>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center border-2 border-dashed border-blue-400 h-96 w-96 rounded-lg bg-black/30">
            <p className="text-white text-center p-4">
              Demo GIF para Landlords
            </p>
          </div>
        </div>

      </section>

      {/* Flechas laterales y Bolitas */}
      {showArrows && (
        <>
          {/* 3 Bolitas de navegación (Solo Mobile) */}
          <div className="absolute bottom-80 left-0 right-0 flex justify-center gap-4 z-50 md:hidden">
            {[1, 2, 3].map((index) => (
              <button
                key={index}
                onClick={() => scrollToSlide(index)}
                className={`
                  w-4 h-4 rounded-full border border-white transition-all duration-300
                  ${activeIndex === index ? "bg-[var(--color-primary)] scale-110" : "bg-transparent/50"}
                `}
                aria-label={`Go to slide ${index}`}
              />
            ))}
          </div>

          <button
            onClick={() => handleScroll("left")}
            type="button"
            className="
              hidden md:block
              absolute left-2 top-1/3 -translate-y-1/2 
              bg-blue-600/30 hover:bg-blue-800/90
              text-blue-700 p-3 rounded-full z-50 transition-colors
              md:top-1/2"
          >
            <ChevronLeft color="white" size={32} />
          </button>
          <button
            onClick={() => handleScroll("right")}
            type="button"
            className="
              hidden md:block
              absolute right-2 top-1/3 -translate-y-1/2
              bg-blue-600/30 hover:bg-blue-800/90 text-blue-700
              p-3 rounded-full z-50 transition-colors
              md:top-1/2"
          >
            <ChevronRight color="white" size={32} />
          </button>
        </>
      )}
    </main>
  );
}