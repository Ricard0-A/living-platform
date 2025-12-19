"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import useUserStore from "@/app/context/useUserStore";

// Esta funcion se activa en cada componente render 

// 1- Llama a UserSTORE y saca la funcion FetchUser, ClearUser y las ACTIVA 
// Fijate en la store lo que hace.

// 2- Escucha cambios de Supabase 


export default function AuthListener() {
  useEffect(() => {
    const { fetchUser, clearUser } = useUserStore.getState();

    console.log("AuthListener mounted");

    // 1️⃣ Al cargar / refrescar
    fetchUser();

    // 2️⃣ Listener global de Supabase
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event) => {
        console.log("🔄 Auth event:", event);

        if (event === "SIGNED_OUT") {
          // 🔥 SOLO limpiamos el estado local
          clearUser();
        }

        if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
          fetchUser();
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return null;
}
