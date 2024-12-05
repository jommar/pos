// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["vuetify-nuxt-module", "@pinia/nuxt"],
  runtimeConfig: {
    mongodbUri: process.env.MONGODB_URI, // MongoDB URI
    mongodbDatabase: process.env.MONGODB_DATABASE, // Database name
  },
});
