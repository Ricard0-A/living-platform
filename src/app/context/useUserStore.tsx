import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";

type UserData = {
  id: string;
  name: string | null;
  lastname: string | null;
  phone: string | null;
  roles: string;       // (client, buyer, seller, etc)
  verified: boolean;
  status: string;
  created_at: string;
};

// ------------------------------
// EL STORE
// ------------------------------

type UserStore = {
  user: UserData | null;
  loading: boolean;

  // < Actions >
  fetchUser: () => Promise<void>;
  updateUserRole: (newRole: string) => Promise<void>;
  logout: () => Promise<void>;

  // Selector para obtener el rol actual
  getUserRole: () => string;
};

const useUserStore = create<UserStore>((set, get) => ({

  // < Store >
  user: null,
  loading: true,

  // < Actions >

  // Action 1
  fetchUser: async () => {
    set({ loading: true });

    const { data: { session }} = await supabase.auth.getSession();

    if (!session) {
      set({ user: null, loading: false });
      return;
    }

    const userId = session.user.id;

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.log("Error fetching user", error.message);
      set({ user: null, loading: false });
      return;
    }

    set({ user: data, loading: false });
  },

  // Action 2 (Actualiza rol en Supabase y refresca el usuario)
  updateUserRole: async (newRole: string) => {
    set({ loading: true });

    const { data: { session }} = await supabase.auth.getSession();
    if (!session) return set({ loading: false });

    const { error } = await supabase
      .from("users")
      .update({ roles: newRole })
      .eq("id", session.user.id);

    if (error) {
      console.error("Error updating role:", error);
      set({ loading: false });
      return;
    }

    // Refrescamos el usuario
    await get().fetchUser();
    set({ loading: false });
  },

  // Action 3
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },

  // ------------------------------
  // Selector clean
  // ------------------------------
  getUserRole: () => {
    const user = get().user;

    // si no hay user -> visitante
    if (!user) return "guest";

    // Supabase devuelve por defecto "client"
    return user.roles; // buyer | seller | landlord | client
  }
}));

export default useUserStore;
