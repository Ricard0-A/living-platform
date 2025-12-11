"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import useUserStore from "@/app/context/useUserStore";
import { roleConfig, ValidRole } from "@/app/config/roles";

// Proposito de ClientNavbar: 

// 1- Es dinamico ya que lee la STORE de user.roles 
// roles viene de supabase ya que USER es una store y sera llenada con objeto de datos 
// entre ellos, roles = "client" || "seller" etc 

const ClientNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Tomamos el rol raw desde el store
  const rawRole: string = useUserStore((state) => state.user?.roles) || "none";

  // Validamos el rol contra roleConfig
  const safeRole: ValidRole =
    rawRole in roleConfig ? (rawRole as ValidRole) : "client";

  // Config para este usuario
  const config = roleConfig[safeRole];

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
      {/* NAVBAR DESKTOP */}
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

        {/* BOTON HAMBURGUESA (solo móvil) */}
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
              <Link
                href={item.route}
                className="hover:text-blue-600 text-lg relative group flex items-center gap-2"
              >
                {/* Ícono opcional */}
                {item.icon ? <item.icon size={22} /> : null}

                <span>{item.label}</span>

                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* NAVBAR MOBILE */}
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
                <Link
                  href={item.route}
                  onClick={() => setIsOpen(false)}
                  className="flex-1 flex items-center gap-2"
                >
                  {item.icon ? <item.icon size={22} /> : null}
                  <span>{item.label}</span>
                </Link>
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
