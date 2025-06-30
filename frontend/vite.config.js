import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Listen on all network interfaces
    port: 5173,      // Default Vite port (optional, already set)
    https: {
      key: "../localhost+1-key.pem", // Path to your key file
      cert: "../localhost+1.pem",   // Path to your certificate file
    },
    // Remove or comment out allowedHosts if using local IP instead of ngrok
    // allowedHosts: [
    //   "213f-110-44-114-6.ngrok-free.app",
    //   "11f5-2400-1a00-b040-ef9e-b02e-39e8-d3a2-7720.ngrok-free.app",
    // ],
  },
  optimizeDeps: {
    exclude: ["aframe", "ar.js"], // Since using CDN
  },
});
