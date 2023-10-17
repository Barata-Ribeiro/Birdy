import { defineConfig } from "vite";
import mkcert from 'vite-plugin-mkcert'
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
	publicDir: "public",
	build: {
		sourcemap: true,
	},
  server: { https: true},
	plugins: [react(), svgr(), mkcert()],
});
