

// ==============================
// IMPORTS
// ==============================

import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";

// ==============================
// TYPES
// ==============================

export type UserData = {
  id: string;
  name: string | null;
  lastname: string | null;
  phone: string | null;
  roles: string;       // client | seller | landlord | etc
  verified: boolean;
  status: string;
  created_at: string;
};

// ==============================
// STORE TYPE
// ==============================

type UserStore = {
  user: UserData | null;
  loading: boolean;

  // ---------- Actions ----------
  fetchUser: () => Promise<void>;
  updateUserRole: (newRole: string) => Promise<void>;

  /**
   * Cierra sesión REAL en Supabase
   *  solo debe ser llamado desde la UI (Navbar, botón, etc)
   */
  logout: () => Promise<void>;

  /**
   * Limpia el estado local del usuario
   *  solo debe ser usado por AuthListener
   */
  clearUser: () => void;

  // ---------- Selectors ----------
  getUserRole: () => string;
};

// ==============================
// STORE IMPLEMENTATION
// ==============================

const useUserStore = create<UserStore>((set, get) => ({
  // ---------- STATE ----------
  // STORE 

  user: null,
  loading: true,

  // =============
  // ACTIONS 
  // =============

  // ==========================
  // 1️- FETCH USER
  // ==========================
  fetchUser: async () => {
    set({ loading: true });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    //  No hay sesión → no hay usuario
    if (!session) {
      set({ user: null, loading: false });
      return;
    }

    const userId = session.user.id;
    console.log("El valor de userID = session.user.id es:", userId)

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();
    // Si explota aqui quiere decir que id no es igual a userId, id de auth.users y tabla users 
    // no son iguales, usuario no existe.
    if (error) {
      console.log("Error fetching user:", error.message);  
      set({ user: null, loading: false });
      return;
    }

    //  Usuario válido
    set({ user: data, loading: false });
  },

  // ==========================
  // 2️- UPDATE ROLE
  // ==========================
  updateUserRole: async (newRole: string) => {
    set({ loading: true });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      set({ loading: false });
      return;
    }

    const { error } = await supabase
      .from("users")
      .update({ roles: newRole })
      .eq("id", session.user.id);

    if (error) {
      console.error("Error updating role:", error.message);
      set({ loading: false });
      return;
    }

    //  Refrescamos el usuario
    await get().fetchUser();
    set({ loading: false });
  },

  // ==========================
  // 3️- LOGOUT REAL (Supabase)
  // ==========================
  logout: async () => {
    //  SOLO cerramos sesión en Supabase
    // El AuthListener se encarga de limpiar el store
    await supabase.auth.signOut();
  },

  // ==========================
  // 4️- CLEAR USER (LOCAL)
  // ==========================
  clearUser: () => {
    set({ user: null, loading: false });
  },

  // ==========================
  // 5️- SELECTOR LIMPIO
  // ==========================
  getUserRole: () => {
    const user = get().user;

    // visitante
    if (!user) return "guest";

    // rol real
    return user.roles || "client";
  },
}));

export default useUserStore;
