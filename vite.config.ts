import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

import dotenv from "dotenv";

dotenv.config();
export default defineConfig(({ mode }) => {
  console.log("Modo de Vite:", mode);
  console.log("VITE_BASE:", process.env.VITE_BASE);
  console.log("VITE_BASE_URL:", process.env.VITE_BASE_URL);
  console.log("VITE_API_URL:", process.env.VITE_API_URL);
  return {
    plugins: [react()],
    base:
      mode === "development"
        ? "/"
        : `${process.env.VITE_BASE}${process.env.VITE_BASE_URL}`,
  };
});
