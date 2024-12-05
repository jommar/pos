<script setup>
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();

authStore.logout();

await navigateTo("/dashboard");
</script>
