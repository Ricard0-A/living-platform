import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";
import React from "react";

const profiles = [
  {
    id: 1,
    title: "Buyer Profile",
    description:
      "From modern apartments to character country houses, start the journey to your dream home..",
    bgImage: "/homes/features-image-2.webp",
    features: [
      "• Personalized home recommendations",
      "• Expert guidance throughout the process",
      "• Access to exclusive listings",
    ],
  },
  {
    id: 2,
    title: "Seller Profile",
    description:
      "From modern apartments to character country houses, start the journey to your dream home.",
    bgImage: "/homes/features-image-2.webp",
    features: [
      "• Get all support from our managers",
      "• Fast hassle-free attention all 24 hours",
      "• Quick modern treatment",
    ],
  },
  {
    id: 3,
    title: "Assitant Profile",
    description:
      "Professional real estate assistance for all your property needs.",
    bgImage: "/homes/features-image-2.webp",
    features: [
      "• Complete transaction support",
      "• Market analysis and insights",
      "• Dedicated customer service",
    ],
  },
];

const Roles = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselRef = useRef<HTMLDivElement | null>(null); // Esto ponerlo en el padre de los Sliders

  // Scroll para las Arrows
  const handleArrowcScroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      // Recuerda que en un inicio es Null, recuerda el ciclo de vida React /
      const width = carouselRef.current?.clientWidth; // Otra manera de obtener el width con nodo DOM
      carouselRef.current?.scrollBy({
        left: direction == "left" ? -width : width,
        behavior: "smooth",
      });
    }
  };

  // UIEvent necesita un target que especifique dónde exactamente se aplica
  // este handlerScroll, así que para eso se usa currentTarget en lugar de target.
  // event.currentTarget === exactamente el elemento que registró este evento,
  // solo este. Como este handler está asignado a un div,
  // entonces solo tendrá las keys de div, nada más.

  // event.target ==== dinámico y es exactamente el elemento que generó el handler.
  // Recuerda que el usuario podría hacer click en cualquier elemento dentro de un
  // div, porque el mouse capta todo: div, p, button, dependiendo de la posición del mouse.

  // Logica para saber en que parte del Slide estamos
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    // Formula: scrollleft / width = Indice del slide actual

    // Siempre scrollLeft solo que su valor varia dependiendo cuanto
    // me muevo con el scroll, no existe scrollRight
    const scrollLeft = event.currentTarget.scrollLeft;
    const width = event.currentTarget.clientWidth;
    const index = Math.round(scrollLeft / width);
    setActiveIndex(index);
  };

  return (
    <section className="mt-13 md:mt-20">
      <div className="flex justify-center items-center mb-9 md:mb-10">
        <h2
          style={{
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.25)",
          }}
          className="text-2xl  text-[#112D6F] md:text-4xl"
        >
          Define Your Role
        </h2>
      </div>

      {/* Carrusel con Snap */}
      <div className="relative">
        {/* Padre Flex  */}
        <div
          onScroll={handleScroll}
          className="flex snap-x snap-mandatory scroll-smooth overflow-x-auto py-7 px-[5vh] space-x-9"
          ref={carouselRef} // Tienes que conectar al useRef inicial para que lea su valor aunque mute luego
        >
          {profiles.map((profile) => (
            <React.Fragment key={profile.id}>
              {/* Mobile Profile */}
              <div className="md:hidden snap-center flex flex-col items-center flex-shrink-0 w-88 gap-6 p-8 bg-gray-300 rounded-2xl">
                <h3 className="text-2xl ">{profile.title}</h3>
                <p className="mx-auto max-w-prose text-center">
                  {profile.description}
                </p>
              </div>

              {/* Desktop Profile Full*/}
              <div className="hidden md:flex md:min-w-full snap-center p-8 rounded-2xl text-lg">
                <div className="flex flex-col flex-[0.7] items-center justify-center gap-7 p-8  bg-gray-300">
                  <h3 className="text-3xl font-bold">{profile.title}</h3>
                  <div className="w-100">
                    <p className="mx-auto max-w-prose text-center">
                      {profile.description}
                    </p>
                  </div>
                </div>
                {/* Features  */}
                <div
                  className="relative flex-1 bg-center text-white ps-5 py-7 text-lg"
                  style={{ backgroundImage: `url(${profile.bgImage})` }}
                >
                  <div className="absolute inset-0 bg-black/40 " />
                  <ul className="relative z-10 flex flex-col gap-7 p-8  rounded-xl">
                    {profile.features.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </React.Fragment>
          ))}

          {/* Flecha Izquierda */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 
             rounded-full bg-white/60 backdrop-blur-sm 
             shadow-lg p-3 cursor-pointer 
             hover:bg-white hover:scale-110 active:scale-95 
             transition-transform duration-200"
            onClick={() => handleArrowcScroll("left")}
          >
            <ChevronLeft size={28} className="text-blue-700" />
          </button>

          {/* Flecha Derecha */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 
             rounded-full bg-white/60 backdrop-blur-sm 
             shadow-lg p-3 cursor-pointer 
             hover:bg-white hover:scale-110 active:scale-95 
             transition-transform duration-200"
            onClick={() => handleArrowcScroll("right")}
          >
            <ChevronRight size={28} className="text-blue-700" />
          </button>
        </div>
      </div>

      {/* Indicadores */}
      <div className="flex justify-center space-x-5 mt-3">
        {profiles.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full ${
              activeIndex === index ? "bg-blue-800" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>
    </section>
  );
};

export default Roles;
