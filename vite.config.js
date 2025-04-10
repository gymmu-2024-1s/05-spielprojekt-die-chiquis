import { defineConfig } from "vite";

export default defineConfig({
  define: {
    "process.env": {},
  },
  server: {
    host: "0.0.0.0",
  },
  test: {
    globals: true,
    environment: "jsdom",
    testIdAttribute: "id",
  },

  base: "/phaser-playground/",
});
