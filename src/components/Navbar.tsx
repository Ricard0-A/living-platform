// app/components/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
// import clsx from "clsx"; //

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-green-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold hover:text-gray-200">
          MiApp
        </Link>

        {/* Botón Hamburguesa */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* Menú Desktop */}
        <div className="hidden md:flex space-x-8">
          <Link
            href="/"
            className="hover:text-gray-300 transition-colors duration-200"
          >
            Inicio
          </Link>
          <Link
            href="/about"
            className="hover:text-gray-300 transition-colors duration-200"
          >
            Sobre mí
          </Link>
          <Link
            href="/contact"
            className="hover:text-gray-300 transition-colors duration-200"
          >
            Contacto
          </Link>
        </div>
      </div>

      {/* Menú Móvil */}
      <div
        className={`md:hidden flex flex-col space-y-2 px-6 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-40 opacity-100 pt-2" : "max-h-0 opacity-0"
        }`}
      >
        <Link
          href="/"
          className="hover:text-gray-300 transition-colors duration-200"
        >
          Inicio
        </Link>
        <Link
          href="/about"
          className="hover:text-gray-300 transition-colors duration-200"
        >
          Sobre mí
        </Link>
        <Link
          href="/contact"
          className="hover:text-gray-300 transition-colors duration-200"
        >
          Contacto
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
