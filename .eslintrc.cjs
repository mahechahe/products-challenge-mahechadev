module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "airbnb",
    "airbnb/hooks",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: {
    react: { version: "18.2" },
  },
  plugins: ["react-refresh", "prettier"],
  rules: {
    "no-underscore-dangle": "off",
    "import/no-unresolved": "off",
    camelcase: "off",
    "no-console": "off",
    "no-nested-ternary": "off",
    "import/no-named-as-default": 0,
    "import/prefer-default-export": "off",
    "import/extensions": "off",
    "import/no-extraneous-dependencies": "off",
    "react-refresh/only-export-components": "off",
    "react/prop-types": "off",
    "no-restricted-exports": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "no-param-reassign": "off",
    "react/jsx-props-no-spreading": "off",
    "react/jsx-no-useless-fragment": "off",
    "no-use-before-define": ["error", { variables: false }],
    "react/jsx-filename-extension": [
      "error",
      {
        extensions: [".js", ".jsx", ".ts", ".tsx"], // Aceptar archivos con extensión .js y .jsx
      },
    ],
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};
