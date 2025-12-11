// roles.tsx
import { CircleUserRound } from "lucide-react";
import { LogOut } from "lucide-react";

export type NavbarItem = {
  label: string;
  route: string;
  icon?: any;
};

export type ValidRole = "client" | "seller" | "landlord" | "none";

export const roleConfig: Record<ValidRole, { navbarItems: NavbarItem[] }> = {
  client: {
    navbarItems: [
      { label: "Dashboard", route: "/account/dashboard" },
      { label: "Offers", route: "/account/buyer/offers" },
      { label: "Favorites", route: "/account/favorites" },

      // Ícono universal (item del navbar)
      { label: "Profile", route: "/account/profile", icon: CircleUserRound },
    ],
  },

  seller: {
    navbarItems: [
      { label: "Dashboard", route: "/account/dashboard" },
      { label: "Published", route: "/account/seller/published" },
      { label: "Add New", route: "/account/seller/form" },

      // Ícono universal
      { label: "Profile", route: "/account/profile", icon: CircleUserRound },
    ],
  },

  landlord: {
    navbarItems: [
      { label: "Dashboard", route: "/account/dashboard" },
      { label: "My Units", route: "/account/landlord/units" },
      { label: "Add Unit", route: "/account/landlord/form" },

      // Ícono universal
      { label: "Profile", route: "/account/profile", icon: CircleUserRound },
    ],
  },

  none: {
    navbarItems: [
      { label: "Dashboard", route: "/account/dashboard" },
      { label: "Help", route: "/account/help"},
      // Ícono universal
      { label: "Profile", route: "/account/profile", icon: CircleUserRound },

      { label: "Logout", route: "/", icon: LogOut},
    ],
  },
};
