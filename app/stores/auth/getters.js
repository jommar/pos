import { jwtDecode } from "jwt-decode";

export const getters = {
  me: (state) => {
    if (!state.token) return { roles: {} }; // Return empty roles if no token

    try {
      const decoded = jwtDecode(state.token); // Decode the JWT
      const rolesArray = decoded.roles || []; // Extract roles or default to an empty array

      // Map roles to an object with { roleName: true }
      const rolesMap = rolesArray.reduce((acc, role) => {
        acc[role] = true;
        return acc;
      }, {});

      return { roles: rolesMap }; // Return structured object
    } catch (error) {
      console.error("Failed to decode JWT:", error);
      return { roles: {} };
    }
  },
  isSuperAdmin: (state, getters) => {
    return getters.me.roles.superadmin || false; // Check if superadmin role exists
  },
};
