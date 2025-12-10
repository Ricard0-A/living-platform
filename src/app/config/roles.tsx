export const roleConfig = {
  none: {
    navbarItems: ["Choose Role", "Help"],
    homePage: "/account/dashboard",
    permissions: ["choose_role"],
  },

  buyerTenant: {
    navbarItems: ["Search", "Saved Homes", "Messages"],
    homePage: "/buyer/home",
    permissions: ["view_listings"],
  },

  seller: {
    navbarItems: ["My Listings", "Add Property", "Messages"],
    homePage: "/seller/home",
    permissions: ["list_properties", "create_property"],
  },

  landlord: {
    navbarItems : ["My properties", "Clients", "In progress"]
  }, 
};