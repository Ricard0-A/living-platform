// src/components/NavbarWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import ClientNavbar from "@/components/ClientNavbar";

export default function NavbarWrapper() {
  const pathname = usePathname();

  // Si la ruta comienza con /account, mostramos el navbar
  const isAccountRoute = pathname.startsWith("/account");

  // En un futuro agrego mas rutas privadas si es necesario
  // const isPrivateRoute = pathname.startsWith('/account') || pathname.startsWith('/dashboard');

  if (isAccountRoute) {
    return <ClientNavbar />;
  }

  return <Navbar />;
}
