"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import useUserStore from "@/app/context/useUserStore";

export default function AuthListener() {
  const fetchUser = useUserStore((state) => state.fetchUser);
  const logout = useUserStore((state) => state.logout);

  useEffect(() => {
    console.log("AuthListener mounted");

    // 1- Al cargar la app / refresh
    fetchUser();

    // 2- Escuchamos cambios de auth en Supabase
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event) => {
        console.log("🔄 Auth event:", event);

        if (event === "SIGNED_OUT") {
          logout();
        } else {
          // SIGNED_IN, TOKEN_REFRESHED, etc
          fetchUser();
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [fetchUser, logout]);

  return null;
}
