import js from "@eslint/js";
import globals from "globals";

export default [
    js.configs.recommended,
    {
        ignores: ["dist/**"],
    },
    {
        files: ["src/build.js"],
        languageOptions: {
            globals: { ...globals.node },
        },
    },
    {
        files: ["src/static/**/*.js"],
        languageOptions: {
            globals: { ...globals.browser },
        },
    },
];
