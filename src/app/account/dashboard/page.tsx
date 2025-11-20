"use client";
import { useRef, useState, useEffect } from "react"; 
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Dashboard() {
  //Constante Ref para acceder al contenedor principal con el fin de scroll
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showArrows, setShowArrows] = useState(false); // Controlo si se muestran las flechas
  const isGoingToIntro = useRef(false); //  Estado bandera para anular flechas al llegar a intro"
  
  // Detectar cuando volvemos al INTRO
  useEffect(() => {
    const container = sectionRef.current; // Nodo DOM 
    if (!container) return; // Limpiar

    const handleScrollCheck = () => {
       // Si scrollLeft es menor a 50px, estamos en el INTRO
      if (container.scrollLeft < 50) {
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
      isGoingToIntro.current = true; //  Activar Estado Bandera
      setShowArrows(false);
    }
    
    container.scrollBy({
      left: direction === "left" ? -width : width,
      behavior: "smooth",
    });
  };

  const handleGo = () => {
    handleScroll("right");
    // Aqui ya no va setArrowsTrue ( Se maneja todo desde useEffect )
  };

  return (
    <section
      ref={sectionRef}
      className="snap-x snap-mandatory scroll-smooth overflow-x-auto overflow-y-hidden flex h-screen w-screen"
      style={{ backgroundImage: "url(/dashboard/client-first-image.jpg)" }}
    >
      {/* Contenedor Intro */}
      <div
        className="snap-center flex-shrink-0 flex flex-col items-center justify-center relative z-10 gap-10 bg-black/70 bg-blend-darken"
        style={{ width: '100vw' }}
      >
        <h1 className="text-4xl text-white md:text-5xl">Welcome, Visitor</h1>
        
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
        className="snap-center  flex-shrink-0 flex items-center justify-center gap-10 bg-black/70 bg-blend-darken px-8"
        
      >
        <div className="flex flex-col items-center relative z-10 gap-2 max-w-2xl">
          <h1 className="text-4xl text-white md:text-5xl">Buyer/Tenant</h1>
          <div className="h-1 w-60 bg-[#141EE6] rounded" />
          
          <div className="pt-8 flex flex-col justify-center items-center gap-8 text-white">
            <div className="text-center md:text-lg">
              <p className="whitespace-normal">
                Find your dream home easily. Explore all properties,
                search by what matters most to you, and keep track
                of your favorite listings. You can also reach out to
                sellers directly from your dashboard.
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
            Demo GIF para Buyers/Tenants
          </p>
        </div>
      </div>

      {/* Contenedor Seller + Demo Gif */}
      <div 
        className="snap-center w-full flex-shrink-0 flex items-center justify-center gap-10 bg-black/70 bg-blend-darken px-8"
      >
        <div className="flex flex-col items-center relative z-10 gap-2 max-w-2xl">
          <h1 className="text-4xl text-white md:text-5xl">Seller</h1>
          <div className="h-1 w-60 bg-[#141EE6] rounded" />
          
          <div className="pt-8 flex flex-col justify-center items-center gap-8 text-white">
            <div className="text-center md:text-lg">
              <p className="whitespace-normal">
                Promote your properties with ease and reach serious buyers fast.
                Add detailed listings with photos, manage all your offers, and keep
                track of every interaction from a single dashboard designed to help
                you sell efficiently and with confidence.
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
        className="snap-center w-full flex-shrink-0 flex items-center justify-center gap-10 bg-black/70 bg-blend-darken px-8"
        
      >
        <div className="flex flex-col items-center relative z-10 gap-2 max-w-2xl">
          <h1 className="text-4xl text-white md:text-5xl">Landlord</h1>
          <div className="h-1 w-60 bg-[#141EE6] rounded" />
          
          <div className="pt-8 flex flex-col justify-center items-center gap-8 text-white">
            <div className="text-center md:text-lg">
              <p className="whitespace-normal">
                Take full control of your rental properties in just a few steps.
                List your apartments or houses, review tenant applications, manage
                contracts and requests, and stay organized while keeping everything
                under one simple, intuitive dashboard.
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

      {/* Flechas laterales */}
      {showArrows && (
        <>
          <button
            onClick={() => handleScroll("left")}
            type="button"
            className="fixed left-4 top-1/2 -translate-y-1/2 bg-blue-600/30 hover:bg-blue-800/90 text-blue-700 p-3 rounded-full z-50 transition-colors"
          >
            <ChevronLeft color="white" size={32} />
          </button>
          <button
            onClick={() => handleScroll("right")}
            type="button"
            className="fixed right-4 top-1/2 -translate-y-1/2 bg-blue-600/30 hover:bg-blue-800/90 text-blue-700 p-3 rounded-full z-50 transition-colors"
          >
            <ChevronRight color="white" size={32} />
          </button>
        </>
      )}
    </section>
  );
}