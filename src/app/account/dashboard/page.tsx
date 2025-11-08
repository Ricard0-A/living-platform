"use client";

export default function Dashboard() {
  return (
    <section
      // W-full
      className="relative w-full flex justify-center"
      style={{ backgroundImage: "url(/dashboard/client-first-image.jpg)" }}
    >
      {/* Overlay Dark */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Contenedor  */}
      <div
        className="
        flex flex-col justify-center items-center  relative z-10 w-100 h-100  
        gap-13 border border-solid border-green-500"
      >
        {/* Contenido ( Titulo y Desc ) */}
        <h1 className="text-4xl text-white"> Welcome, Visitor</h1>
        {/* Descripcion  */}
        <div
          className="
           flex flex-col justify-center items-center
           px-1 gap-6 text-white
           md:flex-row"
        >
          <div className="flex flex-col text-center gap-2">
            <strong className="text-blue-400">
              Its great to have you here!
            </strong>
            <p>
              Now Now you can start doing what you came for. Just click the
              button below to choose your role
            </p>
          </div>

          <button
            className="px-4 py-2 rounded bg-[#141EE6] text-lg font-bold"
            type="button"
          >
            Go!
          </button>
        </div>
      </div>
    </section>
  );
}
