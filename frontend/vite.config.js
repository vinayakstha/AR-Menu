import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Listen on all network interfaces

    allowedHosts: [
      "213f-110-44-114-6.ngrok-free.app",
      "11f5-2400-1a00-b040-ef9e-b02e-39e8-d3a2-7720.ngrok-free.app",
    ],
  },
  optimizeDeps: {
    exclude: ["aframe", "ar.js"], // Since using CDN
  },
});
