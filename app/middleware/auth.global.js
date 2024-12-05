import { useAuthStore } from "~/stores/auth";
import { jwtDecode } from "jwt-decode";

export default defineNuxtRouteMiddleware((to, from) => {
  const publicPath = ["/login", "/logout"];
  if (publicPath.includes(to.path)) return;

  const authStore = useAuthStore();

  // Redirect to /login if no token is present
  if (!authStore.token) {
    return navigateTo("/login");
  }

  if (to.path === "/register" && !authStore.me.roles.superadmin) {
    throw new Error("Only superadmin have access to this page!");
  }

  const decoded = jwtDecode(authStore.token);
  const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000);

  if (decoded.exp && decoded.exp < currentTimeInSeconds) {
    console.error("Token has expired");
    return navigateTo("/logout"); // Redirect to login if expired
  }
});
