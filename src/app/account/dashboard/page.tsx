"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import useUserStore from "@/app/context/useUserStore";
import FullScreenLoader from "@/components/FullScreenLoader";

//  Componentes nuevos
import RoleOnBoarding  from "@/components/Dashboard/RoleOnBoarding";
import MainDashboard from "@/components/Dashboard/MainDashboard";

export default function Dashboard() {
  const router = useRouter();
  const { user, loading } = useUserStore();

  //  Protección: si no está logeado → login
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  //  Mientras carga sesión
  if (!user) {
    return null;
  }

  //  ESTADO 1: Usuario SIN rol → onboarding
  if (user.roles === "client") {
    return <RoleOnBoarding />;
  }

  //  ESTADO 2: Usuario CON rol → dashboard real
  return <MainDashboard />;
}
