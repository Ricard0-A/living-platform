"use client";
import Image from "next/image";

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
      <div className="z-80 relative -start-4 top-15 w-47 h-47 md:-top-8 md:left-1 md:h-60 md:w-60 ">
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
          className="font-serif  text-6xl text-center"
        >
          Find your homeplace
        </h1>
      </div>

      {/* Navigation ( Top )  */}
      <section className="-ms-15">
        <div className="w-full flex justify-center mt-20">
          <div className="me-5 flex bg-transparent justify-center w-180 h-[2.7rem] gap-3 ms-44">
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
          <form className="flex items-center w-220 h-20 bg-[#0025AF] rounded gap-5 px-4">
            {/* ``By Cit`y` */}
            <div className="flex items-center bg-white rounded-xl px-6 py-[5px]">
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
            <button className="bg-[#0B0E52] flex justify-center items-center  text-white rounded-xl whitespace-nowrap">
              <p className="text-lg font-medium ps-3">Search</p>
              <Image
                src="/glass-icon.png"
                width={50}
                height={50}
                alt="Go for it"
              />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
