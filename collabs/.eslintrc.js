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
    // I like non-null assertions.
    "@typescript-eslint/no-non-null-assertion": "off",
    // Disallow default exports; only allow named exports.
    "import/no-default-export": "error",
    // Impose alphabetically ordered imports.
    "import/order": "error",
    // Allow implicit string casts in template literals.
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/ban-ts-comment": [
      "error",
      {
        // Need this for some mixins.
        "ts-expect-error": "allow-with-description",
      },
    ],
    "@typescript-eslint/no-explicit-any": [
      "error",
      {
        // Needed for mixin constructor args. See
        // https://github.com/typescript-eslint/typescript-eslint/issues/2408
        ignoreRestArgs: true,
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        // Allow unused parameter names that start with _,
        // like TypeScript does.
        argsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-this-alias": [
      "error",
      {
        // Occasionally we need to reference an outer "this"
        // inside an object literal.
        allowedNames: ["outerThis"],
      },
    ],
  },
};
