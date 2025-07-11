"use client";
import Image from "next/image";
import { MapPin, StepForward } from "lucide-react";

// import { url } from "inspector";

export default function Home() {
  return (
    //  My Home
    <div
      className="h-200 w-full mt-[-5rem] overflow-hidden"
      style={{
        backgroundImage: "url(./uk-home-opacity-50.png)",
        backgroundPosition: "center",
      }}
    >
      {/* Logo Box  */}
      <div
        className="
        z-80 relative -start-4 top-15 w-47 h-47
        md:-top-8 md:left-1 md:h-60 md:w-60"
      >
        <Image
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt="Lively Place Logo"
          fill
          src={"/logo-brand.png"}
        />
      </div>

      {/* Main Title */}
      <div className="w-full flex justify-center mt-18 ps-5">
        <h1
          style={{ wordSpacing: "0.5rem" }}
          className="font-serif text-center text-5xl md:text-6xl"
        >
          Find your homeplace
        </h1>
      </div>

      {/* Main Navigation */}
      <section className="w-full">
        {/* Top  */}
        <div className="flex justify-center mt-20 ">
          <div className="flex justify-center w-86 h-[2.7rem] gap-3 bg-transparent md:w-180 md:ms-19 ">
            <button className="flex-1 bg-[#0025AF] text-lg rounded ">
              Buy
            </button>
            <button className="flex-1 bg-[#1B40CA] text-lg rounded ">
              Rent
            </button>
          </div>
        </div>

        {/* Search Navigation */}
        <div className="w-full flex justify-center ">
          <form
            className="  
            flex items-center w-85 h-20 m-0 px-2 gap-3 bg-[#0025AF] rounded
            md:w-220 md:-ms-21 md:px-4 md:gap-5 
            "
          >
            {/* By City ( Hidden on mobile ) */}
            <div className="hidden items-center px-6 py-[5px] bg-white rounded-xl md:flex">
              <h2 className="text-black text-base font-medium whitespace-nowrap">
                By city
              </h2>
              <div className="relative w-[28px] h-[28px] ml-1">
                <Image
                  alt="down arrow"
                  src="/black-downward-arrow.png"
                  fill
                  sizes="28px"
                />
              </div>
            </div>

            {/* Input */}
            {/* flex-1 (flex:grow/shrink) siempre intenta tomar el 100% de su padre, 
            y si otras cajas intervienen se acomoda sin problemas  */}
            <div className="flex-1 bg-white h-[53%] rounded flex items-center px-4">
              <input
                className="w-full focus:outline-none text-black text-base"
                type="text"
                placeholder="Say something cool..."
              />
            </div>

            {/* Search button */}
            <button
              className="
            flex justify-center items-center overflow-hidden max-h-14 max-w-35 
            bg-[#0B0E52] text-white whitespace-nowrap rounded-xl"
            >
              <p className="hidden md:block text-lg font-medium ps-3">Search</p>

              <div className="relative h-11 w-12 md:h-13 md:w-12 ">
                <Image src="/glass-icon.png" fill alt="Go for it" />
              </div>
            </button>
          </form>
        </div>
        {/* By city Mobile */}
        <div className="flex justify-center w-full md:hidden">
          <div className="flex justify-center w-85 h-10 bg-black ">
            <ul className="flex overflow-hidden items-center text-sm gap-5 h-10 w-[95%] ">
              <li className="flex gap-2">
                <MapPin size={19} color="white" />
                <span>London</span>
              </li>
              <li>Manchester</li>
              <li>Liverpool</li>
              <li>
                <div className="flex items-center gap-1 h-6 px-2 text-black text-[13px] bg-gray-300 ">
                  <p>More</p>
                  <StepForward size={16} color="black" absoluteStrokeWidth />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
