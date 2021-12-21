module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "import"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:import/typescript",
    "prettier",
  ],
  rules: {
    // Allow inference in function return type.
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    // Remove "object" from ban-types banned list.
    // If eslint v8 worked with Atom, we could just upgrade
    // to that, which already unbans it.
    "@typescript-eslint/ban-types": [
      "error",
      {
        types: {
          object: false,
        },
      },
    ],
  },
};
