module.exports = {
  root: true,
  extends: ["@react-native-community", "plugin:react-native/all"],
  plugins: ["react", "react-native"],
  rules: {
    "no-unused-vars": "warn",
    "react-native/no-unused-styles": "warn",
    "react/jsx-uses-vars": "error",
    "react/jsx-uses-react": "error",
    "import/no-unresolved": "error",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
};
