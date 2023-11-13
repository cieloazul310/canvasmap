module.exports = {
  extends: ["@cieloazul310/eslint-config-custom"],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "./tsconfig.eslint.json",
  },
};
