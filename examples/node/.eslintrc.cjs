module.exports = {
  root: true,
  extends: ["@cieloazul310/eslint-config-custom"],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
  },
};
