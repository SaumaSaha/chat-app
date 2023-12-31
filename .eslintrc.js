module.exports = {
  env: {
    es2022: true,
  },
  parserOptions: {
    "ecmaVersion": "latest"
  },
  rules: {
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "curly": "error",
    "array-callback-return": ["error"],
    "no-cond-assign": ["error", "always"],
    "max-len": ["error", { "code": 90 }],
    "no-unused-vars": "error",
    "eqeqeq": ["error", "always"],
    "comma-spacing": ["error"],
    "array-callback-return": ["error", { checkForEach: true }],
    "no-sparse-arrays": "warn",
    "use-isnan": "error",
    "valid-typeof": "error",
    "camelcase": "warn",
    "complexity": ["warn", 10],
    "default-param-last": "error",
    "dot-notation": "warn",
    "max-depth": ["warn", 3],
    "max-statements": "warn",
    "new-cap": "error",
    "no-eval": "warn",
    "no-extra-semi": "warn",
    "no-magic-numbers": ["warn", { ignoreArrayIndexes: true }],
    "no-nested-ternary": "warn",
    "no-plusplus": "warn",
    "no-undef-init": "warn",
    "no-unneeded-ternary": "error",
    "no-useless-escape": "warn",
    "prefer-const": "warn",
    "key-spacing": ["error", { "afterColon": true }],
    "no-multiple-empty-lines": "error"
  }
};