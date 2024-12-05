<template>
  <div
    class="d-flex bg-grey-darken-3 position-absolute justify-center align-center"
    style="top: 0; bottom: 0; right: 0; left: 0"
  >
    <v-row justify="center">
      <v-col cols="4">
        <v-card>
          <v-card-title class="text-h5 text-center">Login</v-card-title>
          <v-card-text>
            <v-form v-model="form.valid">
              <v-text-field
                v-model="form.username"
                label="Username"
                outlined
                :rules="[rules.required]"
                required
              />
              <v-text-field
                v-model="form.password"
                label="Password"
                type="password"
                outlined
                :rules="[rules.required]"
                required
              />
            </v-form>
          </v-card-text>
          <v-card-actions class="d-flex justify-end">
            <v-btn color="primary" :disabled="!form.valid" @click="handleLogin">
              Login
            </v-btn>
          </v-card-actions>
          <v-alert v-if="form.error" type="error" class="mt-4">
            {{ form.error }}
          </v-alert>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();
if (authStore.token) navigateTo("/dashboard");

const form = ref({
  username: "",
  password: "",
  valid: false,
  error: "",
});

const rules = {
  required: (value) => !!value || "Field is required",
};

const handleLogin = async () => {
  try {
    // Send login request to your API
    const res = await authStore.login({
      username: form.value.username,
      password: form.value.password,
    });

    if (res.success) {
      await navigateTo("/dashboard");
      return;
    }

    throw new Error("Login failed");
  } catch (err) {
    form.value.error = err.data?.message || "Login failed";
  }
};
</script>

<style scoped>
/* Add custom styling here if needed */
</style>
