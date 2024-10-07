const { withSentry } = require("@sentry/react-native/expo");

const config = {
  expo: {
    name: "Strand By Me",
    slug: "app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/logo/logo-5-1024.png",
    userInterfaceStyle: "light",
    scheme: "app",
    assetBundlePatterns: ["**/*"],
    plugins: [
      "expo-apple-authentication",
      [
        "expo-build-properties",
        {
          ios: {
            deploymentTarget: "15.0",
            useFrameworks: "static",
          },
        },
      ],
      "expo-font",
      [
        "@sentry/react-native/expo",
        {
          url: "https://sentry.io/",
          note: "sntr",
          project: "strand-by-me",
          organization: "xdge",
        },
      ],
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.strandbyme.app",
      usesAppleSignIn: true,
      infoPlist: {
        LSApplicationQueriesSchemes: ["about", "http", "https"],
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      eas: {
        projectId: "5de1430c-62f1-46c9-8712-281eb79bc7ff",
      },
    },
    fonts: [
      {
        asset: "./assets/fonts/AntonSC-Regular.ttf",
        family: "Anton",
      },
    ],
  },
};

module.exports = withSentry(config, {
  url: "https://sentry.io/",
  project: "strand-by-me",
  organization: "xdge",
  // Note: SENTRY_AUTH_TOKEN is not explicitly defined here
  // It's automatically picked up from your environment variables
  // Set it using: export SENTRY_AUTH_TOKEN=your_token
});

// The withSentry function will use the SENTRY_AUTH_TOKEN
// from your environment to authenticate with Sentry
// during the build process, enabling automatic
// upload of source maps and other build artifacts

// DOCS;
// https://docs.sentry.io/platforms/react-native/manual-setup/expo/
