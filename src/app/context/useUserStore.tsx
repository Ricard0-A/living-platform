import { create } from "zustand";
import { supabase } from "@/lib/supabaseClient";


type UserData = {
  id: string;
  name: string | null;
  lastname: string | null;
  phone: string | null;
  roles: string;
  verified: boolean;
  status: string;
  created_at: string;
};

type UserStore = {
    user : UserData | null;
    loading : boolean;
    fetchUser : () => Promise<void>; // Promesa que no retorna nada
    logout: () => Promise<void>;
}


const useUserStore = create<UserStore>((set) => ({
    // Similar a flux.js aqui tenemos el objeto con 
    // la store y el actions 

    // < Store >
    user : null,
    loading: true,

    // < Actions > 

    // Action 1
    fetchUser : async () => {
        set({loading:true})
        const { data : { session }} = await supabase.auth.getSession();

        if (!session) {
            set({user: null, loading:false})
            return;
        }
        const userId = session.user.id; // viene de la session acual

        // 2- Consultar la tabla public.users con el ID que viene de la session actual 
        // es decir consultaremos solo info de un usuario adecuado 

        const { data, error} = await supabase.from("users")
            .select("*")
            .eq("id", userId)
            .single()
        // If 
        if (error) {
            console.log("Error fetching user", error.message)
            set({user:null, loading:false});
            return;
        }
        // De otra manera...
        set({user:data, loading:false})
    },

    // Action 2 ( Actualizar rol ) => NewRole: String
    updateUserRole: async (newRole: string) => {
    set({ loading: true });
    
    const { data: { session }} = await supabase.auth.getSession();
    if (!session) return set({ loading: false });
    
    const { error } = await supabase
        .from("users")
        .update({ roles: newRole }) // Clave
        .eq("id", session.user.id); // Actualiza al user correcto

    if (error) {
        console.error("Error updating role:", error);
        set({ loading: false });
        return;
    }

    // Refrescamos el usuario
    await useUserStore.getState().fetchUser();
    set({ loading: false });
   },
   
    // Action  3 
   logout : async () => {
    await supabase.auth.signOut();
    set({ user: null });
   }

}));

export default useUserStore