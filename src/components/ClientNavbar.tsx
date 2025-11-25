"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, LogOut, Menu, X, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

const ClientNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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
      {/* NAVBAR DESKTOP Y MOBILE */}
      <nav
        className="
        relative z-50 flex justify-between items-center
        px-6 py-2 bg-white border-b shadow-md"
      >
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

        {/* BOTÓN HAMBURGUESA (móvil) */}
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
          <li className="relative px-6 border-r border-gray-300">
            <Link
              href="/account/dashboard"
              className="block hover:text-blue-600 text-lg relative group"
            >
              Dashboard
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
            </Link>
          </li>

          <li className="relative px-6 border-r border-gray-300">
            <Link
              href="/account/help"
              className="block hover:text-blue-600 text-lg relative group"
            >
              Help
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
            </Link>
          </li>

          <li className="relative px-6 border-r border-gray-300">
            <Link
              href="/account/favorites"
              className="hover:text-blue-600 flex items-center relative group"
              aria-label="User profile"
            >
              <User width={24} height={24} />
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
            </Link>
          </li>

          <li className="relative px-6">
            <button
              type="button"
              onClick={() => console.log("logout")}
              className="flex items-center gap-2 hover:text-blue-600 relative group"
            >
              <span>Log out</span>
              <LogOut height={22} width={22} />
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
            </button>
          </li>
        </ul>
      </nav>

      {/* NAVBAR MOBILE */}
      <nav
        className={`fixed inset-0 bg-gray-200 text-black z-20 transition-all duration-600 ease-in-out 
    transform ${
      isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
    } md:hidden`}
        style={{ minHeight: "100vh !important", overflow: "auto !important" }}
      >
        <div className="mt-25 w-full">
          <ul className="font-semibold flex flex-col text-xl">
            <li className={`flex items-center justify-between py-6 px-4 border-b border-gray-400 transition-all duration-200 ${
              pathname === "/account/dashboard" ? "bg-blue-100 border-l-4 border-l-blue-600" : "hover:bg-gray-300"
            }`}>
              <Link href="/account/dashboard" onClick={() => setIsOpen(false)} className="flex-1">
                <span>Dashboard</span>
              </Link>
              <ChevronRight color="black" size={20} />
            </li>
            <li className={`flex items-center justify-between py-6 px-4 border-b border-gray-400 transition-all duration-200 ${
              pathname === "/account/help" ? "bg-blue-100 border-l-4 border-l-blue-600" : "hover:bg-gray-300"
            }`}>
              <Link href="/account/help" onClick={() => setIsOpen(false)} className="flex-1">
                <span>Help</span>
              </Link>
              <ChevronRight color="black" size={20} />
            </li>
            <li className={`flex items-center justify-between py-6 px-4 border-b border-gray-400 transition-all duration-200 ${
              pathname === "/account/favorites" ? "bg-blue-100 border-l-4 border-l-blue-600" : "hover:bg-gray-300"
            }`}>
              <Link href="/account/favorites" onClick={() => setIsOpen(false)} className="flex-1">
                <span>User Profile</span>
              </Link>
              <ChevronRight color="black" size={20} />
            </li>
            <li className="flex items-center justify-between py-6 px-4 hover:bg-gray-300 transition-all duration-200">
              <button
                type="button"
                onClick={() => {
                  console.log("logout");
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 flex-1"
              >
                <span>Log out</span>
                <LogOut height={20} width={20} />
              </button>
            </li>
            <li className="mx-auto mt-10 px-4">
              <button className="py-4 px-8 bg-[var(--color-primary)] text-white rounded">Get Evaluation</button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default ClientNavbar;