// .prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
  semi: false,
  singleQuote: false,
  tabWidth: 4,
  useTabs: true,
  plugins: ["prettier-plugin-astro", "prettier-plugin-svelte"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
    {
      files: "*.svelte",
      options: { parser: "svelte" },
    },
  ],
  //pluginSearchDirs: ["."], // should be removed in v3
};
