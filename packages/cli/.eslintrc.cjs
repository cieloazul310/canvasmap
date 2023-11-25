module.exports = {
  root: true,
  extends: ["@cieloazul310/eslint-config-custom"],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "./tsconfig.eslint.json",
  },
  overrides: [
    {
      files: ["bin/*.js"],
      rules: {
        "import/extensions": "off",
      },
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: "./tsconfig.bin.json",
      },
    },
  ],
};
