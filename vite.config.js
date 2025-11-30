import { defineConfig } from "vite";

export default defineConfig({
    base: process.env.DEPLOY_ENV === "GH_PAGES" ? "/test-courses/" : "/",
    server: {
        host: "0.0.0.0",
        port: 3000,
    },
});
