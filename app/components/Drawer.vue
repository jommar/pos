<template>
  <v-navigation-drawer
    v-model="drawerStore.isOpen"
    location="right"
    class="bg-grey-darken-4"
    width="1000"
    temporary
  >
    <div class="d-flex flex-wrap justify-center">
      <NuxtLink
        v-for="(module, index) in modules"
        :key="index"
        :to="module.path"
        class="text-decoration-none"
      >
        <v-card class="ma-4">
          <v-card-text class="pa-2 text-center bg-blue-lighten-4">
            <v-icon size="120" color="blue-darken-4">{{ module.icon }}</v-icon>
            <div class="font-weight-bold text-subtitle-1">
              {{ module.name }}
            </div>
          </v-card-text>
        </v-card>
      </NuxtLink>
    </div>
  </v-navigation-drawer>
</template>

<script setup>
import { useDrawerStore } from "~/stores";

const drawerStore = useDrawerStore();

const modules = [
  { name: "Dashboard", icon: "mdi-view-dashboard", path: "/" },
  { name: "Inventory", icon: "mdi-clipboard-list", path: "/inventory" },
  { name: "Sales", icon: "mdi-cash-register", path: "/sales" },
  { name: "Reports", icon: "mdi-chart-bar", path: "/reports" },
  { name: "Settings", icon: "mdi-cog", path: "/settings" },
];
</script>
