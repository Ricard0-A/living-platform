"use client";

// Importamos nuestro store global donde está el user y rol
import useUserStore  from "@/app/context/useUserStore";

import { useRouter } from "next/navigation";
import { useEffect } from "react";


// Proposito de este componente: 

// Este componente lo que hara es que si este envuelve a otro componente 
// lo que pasara es que activa sus efectos sobre el componente dentro 
// digamos...

// export default function SellerDashboardPage() {
//   return (
//     <RoleGuard>
//       <h1>Bienvenido Seller</h1>
//     </RoleGuard>
//   );
// }

// Flujo...

interface RoleGuardProps {
  children: React.ReactNode;
}

export default function RoleGuard({ children }: RoleGuardProps) {
  const { user, loading } = useUserStore();
  const router = useRouter();

  /**
   * Este useEffect monitorea los cambios en:
   * - user (cuando se loguea o cambia de rol)
   * - loading (cuando aún estamos obteniendo datos)
   * 
   * Su objetivo es:
   * - Si no hay usuario → mandarlo al login
   * - Si usuario está con rol "client" -> mandarlo a elegir rol
   * - Si usuario tiene rol real → permitir navegar
   */
  useEffect(() => {
    // Si todavía estamos cargando el estado global, no tomar decisiones
    if (loading) return;

    // Caso 1: Usuario no logueado → login
    if (!user) {
      router.push("/auth/login");
      return;
    }

    // Caso 2: Usuario logueado pero sin rol definido → dashboard
    if (user.roles === "client") {
      router.push("/account/dashboard");
      return;
    }
  }, [user, loading, router]);

  // Mientras loading es true, evitamos parpadeos o errores visuales
  if (loading) return <p className="font-bold text-3xl text-green-400">Cargando...</p>;

  // Si pasamos todos los checks, mostramos la UI protegida
  return <>{children}</>;
}