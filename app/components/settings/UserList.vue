<template>
  <v-card>
    <v-card-title>User List</v-card-title>
    <v-data-table
      :headers="headers"
      :items="users"
      item-value="_id"
      class="elevation-1"
      hide-default-footer
    >
      <template #item.roles="{ item }">
        <span>{{ item.roles.join(", ") }}</span>
      </template>
      <template #item.createdAt="{ item }">
        <span>{{
          item.createdAt ? new Date(item.createdAt).toLocaleString() : "N/A"
        }}</span>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Define table headers
const headers = [
  { title: "ID", value: "_id" },
  { title: "Username", value: "username" },
  { title: "Roles", value: "roles" },
  { title: "Created At", value: "createdAt" },
];

// Fetch and store users
const fetchUsers = async () => {
  const rawUsers = await useAuthStore().fetchUsers();

  // Remove sensitive data and preprocess
  users.value = rawUsers.map(({ password, ...user }) => user);
};

const users = ref([]);

onMounted(async () => {
  await fetchUsers();
});
</script>
