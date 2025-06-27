"use client";
import Image from "next/image";

import { useState } from "react";
import Link from "next/link";
// import clsx from "clsx"; // Luego para condicionales en cadena

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openLang, setOpenLang] = useState(false);

  return (
    <nav className="text-white shadow-md">
      {/* Main Navbar Superior  */}
      <div className="bg-gray-800 max-w-9xl px-5 flex items-center justify-between">
        {/* Main Language Box   */}
        <div className="flex space-x-5 text-lg font-500 hover:text-gray-200">
          {/* Language  */}
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
          {/* Language Options ( ENG && ESP ) */}
          <div className="mt-2 left-0 flex space-x-4">
            {/* ENG */}
            <div
              className={`flex items-center gap-2 p-2 rounded transition-all duration-300 ease-in-out ${
                openLang
                  ? "opacity-100 translate-x-0 scale-100 pointer-events-auto"
                  : "opacity-0 -translate-x-10 scale-95 pointer-events-none"
              }`}
            >
              <Image
                src="/navbar-images/uk-language.png"
                alt="UK"
                width={40}
                height={40}
                className="object-contain"
              />
              <h2>English</h2>
            </div>

            {/* ESP */}
            <div
              className={`flex items-center gap-2  p-2 rounded transition-all duration-300 ease-in-out ${
                openLang
                  ? "opacity-100 translate-x-0 scale-100 pointer-events-auto"
                  : "opacity-0 -translate-x-19 scale-95 pointer-events-none"
              }`}
            >
              <Image
                src="/navbar-images/spanish-language-icon.png"
                alt="ESP"
                width={40}
                height={40}
                className="object-contain"
              />
              <h2>Spanish</h2>
            </div>
          </div>
        </div>

        {/* Hamburger Bottom  ( For screens less than 768px ) */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* Desktop Menu ( Applies at 768px and above  ) */}
        <div className="hidden md:flex md:items-center space-x-8">
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
          <div className="font-bold p-2 bg-gray-500 text-green-200">
            Sign In
          </div>
        </div>
      </div>

      {/* Móvil Menu  ( For screens less than 768px )  */}
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

      {/* Main Navbar Inferior */}
      <div className="relative z-10 max-w-160 flex justify-end pe-7 py-2 ml-auto">
        {/* Absolute + inset === 1/2 Transparent Background  */}
        <div className="absolute inset-0 bg-black opacity-15 -z-10 rounded-lg" />
        <ul className="z-10 flex asdsa items-center space-x-8 text-lg text-white ">
          <li>Browse properties</li>
          <li>Buy</li>
          <li>Rent</li>
          <li>How it works</li>
          <div className="bg-blue-700 p-2">
            <li>Get Evaluation</li>
          </div>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
