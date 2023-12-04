module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: ["airbnb-base", "airbnb-typescript/base", "prettier"],
};
