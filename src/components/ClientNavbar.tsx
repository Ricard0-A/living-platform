"use client";
import Link from "next/link";
import { LogOut } from "lucide-react";

const ClientNavbar = () => {
  return (
    <nav className="bg-white border-b shadow-sm px-6 py-3 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold">Panel del Usuario</h1>
        <Link
          href="/account/dashboard"
          className="text-gray-700 hover:text-blue-600"
        >
          Dashboard
        </Link>
        <Link
          href="/account/favorites"
          className="text-gray-700 hover:text-blue-600"
        >
          Favoritos
        </Link>
        <Link
          href="/account/settings"
          className="text-gray-700 hover:text-blue-600"
        >
          Configuración
        </Link>
      </div>
      <button
        onClick={() => console.log("Logout")}
        className="flex items-center gap-2 text-red-500 hover:text-red-600"
      >
        <LogOut size={18} />
        Salir
      </button>
    </nav>
  );
};

export default ClientNavbar;
