"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AuthListener() {
  const [emailConfirmed, setEmailConfirmed] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user && user.email_confirmed_at) {
        setEmailConfirmed(true);

        // Revisamos si ya existe en public.users
        const { data: existingUser } = await supabase
          .from("users")
          .select("id")
          .eq("id", user.id)
          .single();

        if (!existingUser) {
          const { error } = await supabase
            .from("users")
            .insert([{ id: user.id }]);
          if (error) console.error("Error al crear perfil:", error.message);
        }
      }
    };

    checkUser();

    // Escuchamos cambios de sesión (login, logout, confirmación, etc.)
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      checkUser();
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="z-100 fixed top-0 left-0 right-0 bottom-0 text-xl text-green-600 border border-solid border-green-400">
      {emailConfirmed ? "✅ Email confirmado" : ""}
    </div>
  );
}
