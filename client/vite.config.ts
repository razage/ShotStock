import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import postcssPresetEnv from "postcss-preset-env";
import cssnano from "cssnano";
import path from "node:path";

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@styles": path.resolve(__dirname, "./src/styles"),
            "@components": path.resolve(__dirname, "./src/components"),
        },
    },
    css: {
        preprocessorOptions: {
            less: {
                modifyVars: {
                    "@error-color": "#f44336",
                    "@info-color": "#29b6f6",
                    "@primary-color": "#1976d3",
                    "@secondary-color": "#90caf9",
                    "@success-color": "#66bb6a",
                    "@textDisabled-color": "rgba(255, 255, 255, 0.5)",
                    "@textSecondary-color": "rgba(255, 255, 255, 0.7)",
                    "@warning-color": "#ffa726",
                },
            },
        },
        postcss: {
            plugins: [postcssPresetEnv(), cssnano()],
        },
    },
    build: {
        outDir: "dist",
        assetsDir: "assets",
        cssCodeSplit: true,
        minify: "esbuild",
    },
});
