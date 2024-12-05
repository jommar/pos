<template>
  <v-app class="d-flex flex-column h-100">
    <!-- Header -->
    <v-app-bar app flat class="bg-primary text-white">
      <template #default>
        <v-container fluid> My Header </v-container>
      </template>
      <template #append>
        <v-btn icon @click="toggleDrawer">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>
    </v-app-bar>

    <!-- Scrollable Content -->
    <v-main class="d-flex flex-column flex-grow-1">
      <div class="flex-grow-1 overflow-auto bg-grey-lighten-4">
        <v-container fluid>
          <NuxtPage />
        </v-container>
      </div>
    </v-main>

    <!-- Drawer -->
    <Drawer />

    <!-- Footer -->
    <v-footer app flat class="bg-secondary text-white">
      <template #default> My Footer </template>
    </v-footer>
  </v-app>
</template>

<script setup>
import { useDrawerStore } from "~/stores";

const drawerStore = useDrawerStore();

// Method to toggle drawer
const toggleDrawer = () => {
  drawerStore.toggle();
};
</script>
