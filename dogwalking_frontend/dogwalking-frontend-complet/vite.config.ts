import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 8080,
    middlewareMode: false,
    allowedHosts: ["8080-it6c4h0y11xzqk3z9ul2z-a8fd5def.manusvm.computer"],
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  define: {
    global: {},
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ssr: {
    noExternal: [],
  },
}));
