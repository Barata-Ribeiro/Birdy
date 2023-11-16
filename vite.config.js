import react from "@vitejs/plugin-react";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
	publicDir: "public",
	build: {
		sourcemap: true,
		minify: "esbuild",
		outDir: "dist",
	},
	plugins: [react(), svgr(), splitVendorChunkPlugin()],
});
