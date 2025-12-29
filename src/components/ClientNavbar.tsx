"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronRight } from "lucide-react";
import useUserStore from "@/app/context/useUserStore";
import { roleConfig, ValidRole } from "@/app/config/roles";


// ACTUALIZAR LUEGO ESTE COMPONENTE: 

// Se tiene que negar el renderizado de este Clientnavbar cuando el user no este logeado.
// Ya que este componente es global 


// ==================================================
// ==================================================


// Proposito de ClientNavbar: 

// 1- Es dinamico ya que lee la STORE de user.roles 
// roles viene de supabase ya que USER es una store y sera llenada con objeto de datos 
// entre ellos, roles = "client" || "seller" etc 

// Flujo:

// 1- ClientNavbar lee la store si un usuario ya se ha logeado con anterioridad y se almacena 
// un store de user ( con su role : "client" "seller" etc )

// 2- Usamos ese roles = "seller" por ej: y lo usamos para decidir que hacer con Config/roles.tsx
// ahora config solo se basa en Seller y luego iteraremos el array de "Seller" para un 
// Navbar especial de usuario Seller.

const ClientNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Actions del store
  const logout = useUserStore((state) => state.logout);

  // 1️ Tomamos el rol DESDE EL SELECTOR
  const role = useUserStore((state) => state.getUserRole());

  // 2️ Validamos contra el config
  const safeRole: ValidRole =
    role in roleConfig ? (role as ValidRole) : "client";

  // 3️ Config final
  const config = roleConfig[safeRole];

  // Mantiene tu lógica original de overflow
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (isOpen) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
    } else {
      html.style.overflow = "";
      body.style.overflow = "";
    }

    return () => {
      html.style.overflow = "";
      body.style.overflow = "";
    };
  }, [isOpen]);
  return (
    <>
      {/* ================= DESKTOP NAVBAR ================= */}
      <nav className="relative z-50 flex justify-between items-center px-6 py-2 bg-white border-b shadow-md">
        {/* LOGO */}
        <div className="relative h-16 w-32 flex-shrink-0">
          
          <Link href="/" aria-label="Go to home">
            <Image
              fill
              alt="Main logo"
              src="/logo-brand-fixed.png"
              className="object-contain"
            />
          </Link>
        </div>

        {/* BOTÓN HAMBURGUESA ( Solo para movil )*/}
        <button
          type="button"
          className="md:hidden p-2 hover:text-blue-600 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* NAV ITEMS DESKTOP */}
        <ul className="hidden md:flex items-center gap-0 font-semibold list-none">
          {config.navbarItems.map((item, i) => (
            <li
              key={i}
              className="relative px-6 border-r border-gray-300 flex items-center"
            >
              {/* Cuando en toda la iteracion item.action sea logout, crea el boton logout  */}
              {item.action === "logout" ? (
                <Link href={"/login"}>
                  <button
                    onClick={async () => {
                      await logout();     // cierre de sesión
                    }}
                    className="hover:cursor-pointer hover:text-red-600 text-lg flex items-center gap-2"
                  >
                    {item.icon && <item.icon size={22} />}
                    <span>{item.label}</span>
                  </button>
                </Link>
              ) : (
                <Link
                  href={item.route!}
                  className="hover:text-blue-600 text-lg flex items-center gap-2"
                >
                  {item.icon && <item.icon size={22} />}
                  <span>{item.label}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* ================= MOBILE NAVBAR ================= */}
      <nav
        className={`fixed inset-0 bg-gray-200 text-black z-20 transition-all duration-600 ease-in-out 
        transform ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"} md:hidden`}
      >
        <div className="mt-25 w-full">
          <ul className="font-semibold flex flex-col text-xl">
            {config.navbarItems.map((item, i) => (
              <li
                key={i}
                className="flex items-center justify-between py-6 px-4 border-b border-gray-400 hover:bg-gray-300 transition-all duration-200"
              >
                {item.action === "logout" ? (
                  <button
                    onClick={async () => {
                      await logout();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-2 w-full text-left"
                  >
                    {item.icon && <item.icon size={22} />}
                    <span>{item.label}</span>
                  </button>
                ) : (
                  <Link
                    href={item.route!}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2"
                  >
                    {item.icon && <item.icon size={22} />}
                    <span>{item.label}</span>
                  </Link>
                )}

                <ChevronRight color="black" size={20} />
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default ClientNavbar;