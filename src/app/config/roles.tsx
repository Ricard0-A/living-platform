// roles.tsx
import { CircleUserRound, LogOut } from "lucide-react";

// Proposito: 

// Este config esta hecho para ser utilizado por ClientNavbar 
// para decirdir que tipo de Navbar mostrar: SellerNavbar, BuyerNavbar etc 


// =]==]==]==]==]==]==]==]==]==]==]==]==]==]==]==]==]==]==]==]==]==]==]==]==]=


/*
  Cada item del navbar puede:
  navegar (route)
  ejecutar una acción especial (action)

 */

// Importamos types a ClientNavbar

export type NavbarItem = {
  label: string;
  route?: string;
  action?: "logout";
  icon?: any;
};

export type ValidRole = "client" | "seller" | "landlord";


/*

  Configuración centralizada del navbar por rol
  El ClientNavbar SOLO lee este objeto

*/

export const roleConfig: Record<
  ValidRole,
  { navbarItems: NavbarItem[] }
> = {
  client: {
    navbarItems: [
      { label: "Dashboard", route: "/account/dashboard" },
      { label: "Offers", route: "/account/buyer/offers" },
      { label: "Favorites", route: "/account/favorites" },
      { label: "Profile", route: "/account/profile", icon: CircleUserRound },
      { label: "Logout", action: "logout", icon: LogOut },
    ],
  },

  seller: {
    navbarItems: [
      { label: "Dashboard", route: "/account/dashboard" },
      { label: "Published", route: "/account/seller/published" },
      { label: "Add New", route: "/account/seller/form" },
      { label: "Profile", route: "/account/profile", icon: CircleUserRound },
      { label: "Logout", action: "logout", icon: LogOut },
    ],
  },

  landlord: {
    navbarItems: [
      { label: "Dashboard", route: "/account/dashboard" },
      { label: "My Units", route: "/account/landlord/units" },
      { label: "Add Unit", route: "/account/landlord/form" },
      { label: "Profile", route: "/account/profile", icon: CircleUserRound },
      { label: "Logout", action: "logout", icon: LogOut },
    ],
  },

};
