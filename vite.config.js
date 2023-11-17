import react from "@vitejs/plugin-react";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import mkcert from "vite-plugin-mkcert";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
	publicDir: "public",
	build: {
		sourcemap: true,
		minify: "esbuild",
		outDir: "dist",
	},
	server: { https: true },
	plugins: [
		react(),
		svgr({
			include: "**/*.svg?react",
		}),
		mkcert(),
		splitVendorChunkPlugin(),
	],
});
