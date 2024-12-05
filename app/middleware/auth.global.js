import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path === "/login") return;

  const authStore = useAuthStore();

  // Redirect to /login if no token is present
  if (!authStore.token) {
    return navigateTo("/login");
  }
});
