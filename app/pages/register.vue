<template>
  <v-row justify="center">
    <v-col cols="4">
      <v-card>
        <v-card-title class="text-center">
          <h2>Register</h2>
        </v-card-title>
        <v-card-text>
          <v-form v-model="form.valid">
            <v-text-field
              label="Username"
              v-model="form.username"
              :rules="[rules.required]"
            />
            <v-text-field
              v-model="form.password"
              label="Password"
              :type="showPassword ? 'text' : 'password'"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="togglePasswordVisibility"
              :rules="[rules.required]"
            />
            <v-select
              label="Role"
              v-model="form.roles"
              :items="USER_ROLES"
              :rules="[rules.required]"
            />
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn
            color="primary"
            :disabled="!form.valid"
            @click="handleRegister"
          >
            Register
          </v-btn>
        </v-card-actions>
        <v-alert
          v-if="message.error || message.success"
          :type="message.type"
          class="mt-4"
        >
          {{ message.message }}
        </v-alert>
      </v-card>
    </v-col>
  </v-row>
</template>
<script setup>
import { USER_ROLES } from "~/server/constants";
import { rules } from "~/util/rules";

const form = ref({
  valid: false,
  username: "",
  password: "",
  roles: "",
});

const message = ref({
  error: false,
  success: false,
  message: null,
  type: null,
});

const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const initMessage = () => {
  message.value.message = null;
  message.value.error = false;
  message.value.success = false;
  message.value.type = null;
};

const clearForm = () => {
  initMessage();
  form.value = {
    valid: false,
    username: "",
    password: "",
    roles: "",
  };
};

const handleRegister = async () => {
  try {
    await useAuthStore().register(form.value);
    message.value.success = true;
    message.value.message = "User registered";
    message.value.type = "success";
  } catch (e) {
    message.value.error = true;
    message.value.message = e.response.data.message;
    message.value.type = "error";
  } finally {
    setTimeout(() => clearForm(), 2000);
  }
};
</script>
