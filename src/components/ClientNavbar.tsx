"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, LogOut, Menu, X } from "lucide-react";

const ClientNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
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

      {/* NAV ITEMS */}
      <ul
        className={`flex flex-col md:flex-row items-center gap-6 font-semibold list-none 
        absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent 
        border-t md:border-0 shadow-md md:shadow-none transition-all duration-300 
        ${
          isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible md:visible md:opacity-100"
        }
        md:justify-end md:gap-0 py-4 md:py-0 z-10`}
      >
        <li className="relative md:px-6 md:border-r md:border-gray-300">
          <Link
            href="/account/dashboard"
            className="block hover:text-blue-600 text-lg px-4 py-2 md:px-0 relative group"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center hidden md:block"></span>
          </Link>
        </li>

        <li className="relative md:px-6 md:border-r md:border-gray-300">
          <Link
            href="/account/help"
            className="block hover:text-blue-600 text-lg px-4 py-2 md:px-0 relative group"
            onClick={() => setIsOpen(false)}
          >
            Help
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center hidden md:block"></span>
          </Link>
        </li>

        <li className="relative md:px-6 md:border-r md:border-gray-300">
          <Link
            href="/account/favorites"
            className="hover:text-blue-600 flex items-center px-4 py-2 md:px-0 relative group"
            aria-label="User profile"
            onClick={() => setIsOpen(false)}
          >
            <User width={24} height={24} />
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center hidden md:block"></span>
          </Link>
        </li>

        <li className="relative md:px-6">
          <button
            type="button"
            onClick={() => console.log("logout")}
            className="flex items-center gap-2 hover:text-blue-600 px-4 py-2 md:px-0 relative group"
          >
            <span>Log out</span>
            <LogOut height={22} width={22} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default ClientNavbar;