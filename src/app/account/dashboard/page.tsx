"use client";

export default function Dashboard() {
  return (
    <section
      // W-full 
      // Section tendra mas contenedores Hijos asi que puede ser un flex-col aqui 
      // con gap 
      className="flex flex-col gap-30 relative w-full "
      style={{ backgroundImage: "url(/dashboard/client-first-image.jpg)" }}
    >
      {/* Dark Overlay  */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Contenedor Intro*/}
      <div
        className="
          pt-30
          flex flex-col items-center 
          relative z-10 w-100  gap-10
          border border-solid border-green-500 
          md:w-full md:gap-27"
      >
        {/* Contenido ( Titulo y Desc ) */}
        <h1 className="text-4xl text-white md:text-5xl"> Welcome, Visitor</h1>
        {/* Descripcion  */}
        <div
          className="
           flex flex-col justify-center items-center
           px-1 gap-6 text-white
           md:flex-row md:gap-30"
        >
          {/* Texto */}
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
            className="
              px-4 py-2 rounded bg-[#141EE6]
              text-lg font-bold
              md:px-5 md:py-3 md:text-xl"
            type="button"
          >
            Go!
          </button>
        </div>
      </div>

      {/* Contenedor Buyer/Tenant + Demo Gif  */}
      <div className="flex gap-10">
        {/* Buyer/Tenant  */}
        <div
        className="
          
          flex flex-col items-center 
          relative z-10 w-100  gap-0.5
          border border-solid border-green-500 
          md:w-full md:gap-2"
      >
        {/* Contenido ( Titulo y Desc ) */}
        <h1 className="text-4xl text-white md:text-5xl">Buyer/Tenant</h1>
        {/* Linea azul  */}
        <div className="h-1 w-57 bg-[var(--color-primary)] rounded md:w-75"/>
        {/* Descripcion  */}
        <div
          className="
           pt-8 flex flex-col justify-center items-center
           px-10 gap-8 text-white
          "
        >
          {/* Texto */}
          <div className="text-center md:text-center md:text-lg">
            
            <p className="whitespace-normal ">
              Find your dream home easily. Explore all properties, 
              search by what matters most to you, and keep track 
              of your favorite listings. You can also reach out to
              sellers directly from your dashboard.
            </p>
          </div>

          <button
            className="
              px-4 py-2 rounded-2xl bg-[#141EE6]
              text-xl font-bold
              md:px-5 md:py-3 md:text-xl"
            type="button"
          >
            Start
          </button>
        </div>
      </div>

        {/* Demo Gif  */}
        <div className="
          hidden md:block border-2 border-solid border-green-400
          h-100 w-400"
        >
          <p className="text-white text-center">
            XXXXXXXXXXXXXXXXXX
            XXXXXXXXXXXXXXXXXX
            XXXXXXXXXXXXXXXXXX
            XXXXXXXXXXXXXXXXXX
          </p>
          <h1>Aqui existira un gif demo para indicar como usar la plataforma 
            para los usuarios Buyers/Tenants
          </h1>

        </div>

      </div>
      
      {/* Contenedor Seller  */}
      {/* Contenedor Seller + Demo Gif  */}
      <div className="flex gap-10">
        {/* Buyer/Tenant  */}
        <div
        className="
          
          flex flex-col items-center 
          relative z-10 w-100  gap-0.5
          border border-solid border-green-500 
          md:w-full md:gap-2"
      >
        {/* Contenido ( Titulo y Desc ) */}
        <h1 className="text-4xl text-white md:text-5xl">Seller</h1>
        {/* Linea azul  */}
        <div className="h-1 w-57 bg-[var(--color-primary)] rounded md:w-75"/>
        {/* Descripcion  */}
        <div
          className="
           pt-8 flex flex-col justify-center items-center
           px-10 gap-8 text-white
          "
        >
          {/* Texto */}
          <div className="text-center md:text-center md:text-lg">
            
            <p className="whitespace-normal ">
              Promote your properties with ease and reach serious buyers fast.
              Add detailed listings with photos, manage all your offers, and keep
              track of every interaction from a single dashboard designed to help
              you sell efficiently and with confidence.
            </p>
          </div>

          <button
            className="
              px-4 py-2 rounded-2xl bg-[#141EE6]
              text-xl font-bold
              md:px-5 md:py-3 md:text-xl"
            type="button"
          >
            Start
          </button>
        </div>
      </div>

        {/* Demo Gif  */}
        <div className="
          hidden md:block border-2 border-solid border-green-400
          h-100 w-400"
        >
          <p className="text-white text-center">
            XXXXXXXXXXXXXXXXXX
            XXXXXXXXXXXXXXXXXX
            XXXXXXXXXXXXXXXXXX
            XXXXXXXXXXXXXXXXXX
          </p>
          <h1>Aqui existira un gif demo para indicar como usar la plataforma 
            para los usuarios Buyers/Tenants
          </h1>

        </div>

      </div>
      

      {/* Contenedor Landlord  */}
      {/* Contenedor Landlord + Demo Gif  */}
      <div className="flex gap-10">
        {/* Buyer/Tenant  */}
        <div
        className="
          
          flex flex-col items-center 
          relative z-10 w-100  gap-0.5
          border border-solid border-green-500 
          md:w-full md:gap-2"
      >
        {/* Contenido ( Titulo y Desc ) */}
        <h1 className="text-4xl text-white md:text-5xl">Landlord</h1>
        {/* Linea azul  */}
        <div className="h-1 w-57 bg-[var(--color-primary)] rounded md:w-75"/>
        {/* Descripcion  */}
        <div
          className="
           pt-8 flex flex-col justify-center items-center
           px-10 gap-8 text-white
          "
        >
          {/* Texto */}
          <div className="text-center md:text-center md:text-lg">
            
            <p className="whitespace-normal ">
              Find your dream home easily. Explore all properties, 
              search by what matters most to you, and keep track 
              of your favorite listings. You can also reach out to
              sellers directly from your dashboard.
            </p>
          </div>

          <button
            className="
              px-4 py-2 rounded-2xl bg-[#141EE6]
              text-xl font-bold
              md:px-5 md:py-3 md:text-xl"
            type="button"
          >
            Start
          </button>
        </div>
      </div>

        {/* Demo Gif  */}
        <div className="
          hidden md:block border-2 border-solid border-green-400
          h-100 w-400"
        >
          <p className="text-white text-center">
            XXXXXXXXXXXXXXXXXX
            XXXXXXXXXXXXXXXXXX
            XXXXXXXXXXXXXXXXXX
            XXXXXXXXXXXXXXXXXX
          </p>
          <h1>Aqui existira un gif demo para indicar como usar la plataforma 
            para los usuarios Buyers/Tenants
          </h1>

        </div>

      </div>
    </section>
  );
}
