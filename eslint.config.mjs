import {FlatCompat} from "@eslint/eslintrc"
import pluginVue from "eslint-plugin-vue"
import pluginVuetify from "eslint-plugin-vuetify"
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

const compat = new FlatCompat({
    config: pluginVuetify.configs.recommended,
})


export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...pluginVue.configs["flat/essential"],
    ...pluginVue.configs["flat/recommended"],
    ...pluginVue.configs["flat/strongly-recommended"],
    ...compat.extends("plugin:vue/base"),
    {
        plugins: {
            'typescript-eslint': tseslint.plugin,
        },
        languageOptions: {
            parserOptions: {
                parser: tseslint.parser,
                project: './tsconfig.eslint.json',
                extraFileExtensions: ['.vue'],
                sourceType: 'module',
            },
        },
        rules: {
            "vue/no-deprecated-slot-attribute": "off",
        },
        ignores: ["src/**/*.js", "eslint.config.mjs"]
    },
);
