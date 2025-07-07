"use client";
import Image from "next/image";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Menu, X } from "lucide-react";

import { useState } from "react";

import Link from "next/link";
// import clsx from "clsx"; // Luego para condicionales en cadena

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openLang, setOpenLang] = useState(false);

  return (
    <>
      <nav className="hidden md:block shadow-md text-white ">
        {/* Main Navbar ( Top )  */}
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
            {/* Language Options ( ENG && ESP )  (Left side ) */}
            <div className="mt-2 left-0 flex space-x-4">
              {/* ENG */}
              <div
                className={`flex items-center gap-2 p-2 rounded transition-all duration-300 ease-in-out ${
                  openLang
                    ? "opacity-100 translate-x-0 scale-100 pointer-events-auto"
                    : "opacity-0 -translate-x-10 scale-95 pointer-events-none"
                }`}
              >
                <div className="relative w-[40px] h-[40px]">
                  <Image
                    src="/navbar-images/uk-language.png"
                    alt="UK flag"
                    fill
                    sizes="40px"
                  />
                </div>
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
                  alt="ESP flag"
                  width={40}
                  height={40}
                  className="object-contain"
                />
                <h2>Spanish</h2>
              </div>
            </div>
          </div>

          {/* Desktop Menu ( Applies at 768px and above ) ( Right side )  */}
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
            <div className="font-bold px-4 p-2 bg-gray-500 text-green-200">
              Sign In
            </div>
          </div>
        </div>

        {/* Navbar ( Bottom )  */}
        <div className="relative -top-1 z-10 overflow-hidden max-h-[5rem] max-w-[41rem] ml-auto px-4 py-3">
          {/* Transparent overlay */}
          <div className="absolute inset-0 bg-black opacity-15 -z-10 rounded-lg" />
          <ul className="z-10 flex items-center justify-end gap-6 text-lg text-white pe-4">
            <li>
              <div className="flex items-center gap-2">
                <h2> Browse properties</h2>
                <ChevronDown color="white" size="20" />
              </div>
            </li>
            <li>Buy</li>
            <li>Rent</li>
            <li>How it works</li>
            <li>
              <div className="bg-blue-700 px-3 py-3 rounded">
                Get Evaluation
              </div>
            </li>
          </ul>
        </div>
      </nav>
      {/* Open/Close Mobile Navbar */}
      <div
        className={`fixed top-4 right-4 z-60 cursor-pointer md:hidden`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="scale-250" color="white" size={20} />
        ) : (
          <Menu className="scale-250" color="white" size={20} />
        )}
      </div>

      {/* Mobile Navbar*/}
      <nav
        className={`fixed inset-0 bg-black text-white z-50 transition-all duration-600 ease-in-out 
    transform ${
      isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
    }`}
      >
        <div className="pt-40 w-full">
          <ul className="flex flex-col gap-6 text-xl p-4">
            <li className="flex items-center space-x-2">
              <span>Browse properties</span>
              <ChevronRight color="white" size={20} />
            </li>
            <li className="flex items-center space-x-2">
              <span>Buy</span>
              <ChevronRight color="white" size={20} />
            </li>
            <li className="flex items-center space-x-2">
              <span>Rent</span>
              <ChevronRight color="white" size={20} />
            </li>
            <li className="flex items-center space-x-2">
              <span>How it works</span>
              <ChevronRight color="white" size={20} />
            </li>
            <li>
              <div className="w-[50%] h-0.5 bg-white" />
            </li>
            <li className="flex items-center space-x-2">
              <span>Languages</span>
              <ChevronRight color="white" size={20} />
            </li>
            <li className="flex items-center space-x-2">
              <span>Contact us</span>
              <ChevronRight color="white" size={20} />
            </li>
            <li className="flex items-center space-x-2">
              <span>Get Evaluation</span>
              <ChevronRight color="white" size={20} />
            </li>
            <li>
              <div className="mt-13 flex items-center justify-center mx-auto p-4 w-[52%]  bg-[#0025AF]">
                <h2 className="text-1xl">Sign In</h2>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
