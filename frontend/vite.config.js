import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/api/send-email": "http://localhost:5000", // Redirection spécifique pour l'envoi d'email
        },
    },
});
