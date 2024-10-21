import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** @type {import('vite').UserConfig} */
export default defineConfig({
	plugins: [react()],
	server: {
		host: "0.0.0.0",
		origin: "http://wallpaper.local:9902",
		port: 9902
	},
});
