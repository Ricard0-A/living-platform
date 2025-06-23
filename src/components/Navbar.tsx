"use client";
// import Image from "next/image";

import { useState } from "react";
import Link from "next/link";
// import clsx from "clsx"; // Luego para condicionales en cadena

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openLang, setOpenLang] = useState(false);

  return (
    <nav className="bg-green-400text-white shadow-md">
      <div className="max-w-9xl px-6 py-4 flex items-center justify-between">
        <div className="flex space-x-5 text-lg font-500 hover:text-gray-200">
          {/* LANG */}
          <div
            className="cursor-pointer flex items-center gap-2"
            onClick={() => setOpenLang(!openLang)}
          >
            <h1>Languages</h1>
            <img
              className="h-4"
              src="./navbar-images/play-button-icon.png"
              alt="open box"
            />
          </div>
          {/* Caja padre de eng y esp */}
          <div className="mt-2 left-0 flex space-x-4">
            {/* ENG */}
            <div
              className={`flex items-center gap-2 p-2 rounded transition-all duration-300 ease-in-out ${
                openLang
                  ? "opacity-100 translate-x-0 scale-100 pointer-events-auto"
                  : "opacity-50 -translate-x-10 scale-95 pointer-events-none"
              }`}
            >
              <img
                className="h-10"
                src="./navbar-images/uk-language.png"
                alt="eng"
              />
              <h2>English</h2>
            </div>
            {/* ESP */}
            <div
              className={`flex items-center gap-2  p-2 rounded transition-all duration-300 ease-in-out ${
                openLang
                  ? "opacity-100 translate-x-0 scale-100 pointer-events-auto"
                  : "opacity-50 -translate-x-19 scale-95 pointer-events-none"
              }`}
            >
              <img
                className="h-10"
                src="./navbar-images/spanish-language-icon.png"
                alt="esp"
              />
              <h2>Spanish</h2>
            </div>
          </div>
        </div>

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
            Home
          </Link>
          <Link
            href="/about"
            className="hover:text-gray-300 transition-colors duration-200"
          >
            About us
          </Link>
          <Link
            href="/contact"
            className="hover:text-gray-300 transition-colors duration-200"
          >
            Contact
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
          Home
        </Link>
        <Link
          href="/about"
          className="hover:text-gray-300 transition-colors duration-200"
        >
          About us
        </Link>
        <Link
          href="/contact"
          className="hover:text-gray-300 transition-colors duration-200"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
