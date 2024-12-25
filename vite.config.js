import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite configuration
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: "./index.html",
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"], // Split vendor libraries into a separate chunk
        },
      },
    },
  },
  server: {
    historyApiFallback: true, // Enable for client-side routing
  },
});
