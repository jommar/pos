import axios from "axios";

export const actions = {
  async login(credentials) {
    try {
      const res = await axios.post("/api/auth/login", credentials);

      const authCookie = useCookie("auth_token");

      authCookie.value = res.data.token;
      this.token = res.data.token;

      return res.data;
    } catch (error) {
      console.error("Failed to login:", error);
    }
  },
  logout() {
    this.token = null;
    const authCookie = useCookie("auth_token");
    authCookie.value = null;
  },
  async register(credentials) {
    const res = await axios.post("/api/auth/register", credentials);
    return res.data;
  },

  async fetchUsers() {
    const res = await axios.get("/api/users");
    return res.data.users;
  },
};
