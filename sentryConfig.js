import * as Sentry from "@sentry/react-native";

// -----------------------------------------------------------------------------------------------------------------------
// Notes
// -----------------------------------------------------------------------------------------------------------------------
// Using Expo 49 requires different setup for Sentry.
//
// Setting both tracesSampleRate and profilesSampleRate to 1.0 (100%)
// This captures all transactions and profiles for maximum insight
// Recommended for new apps to quickly identify and resolve issues
// Revisit these values as the app grows and adjust based on volume and performance needs
//
//
// Require to update app.json for plugins and hooks
//
// Docs; https://docs.expo.dev/guides/using-sentry/
//
// Issues;
// https://github.com/expo/sentry-expo/issues/368

// -----------------------------------------------------------------------------------------------------------------------
// Setup
// -----------------------------------------------------------------------------------------------------------------------
// Sentry Setup and Source Maps for React Native Expo
// 1. Source maps: Files that map minified production code to original source code.
// Crucial for readable error stack traces in Sentry.
// 2. Configuration: Ensure postPublish hook is in app.json or app.config.js
// This automatically uploads source maps when publishing.
// 3. Production Builds: Source maps typically handled automatically by EAS Build.
// 4. For most Expo workflows: No additional steps needed for source maps
// if Sentry is configured correctly.
// 5. EAS Update or self-hosted updates: May require manual source map upload.
// Use Sentry CLI after generating an update. See docs for details.
// 6. Verify setup: Check Sentry dashboard for readable stack traces
// after reproducing an error in production build.
// Note: Keep Sentry auth token secure. Use environment variables, not in code.

// -----------------------------------------------------------------------------------------------------------------------
// Initialize Sentry
// -----------------------------------------------------------------------------------------------------------------------
// Sentry Configuration for New App:
Sentry.init({
  dsn: "https://ea1b1b28620ad5cc2d0abe4a46251b87@o4507800455086080.ingest.us.sentry.io/4507800459149312",
  enableInExpoDevelopment: true,
  // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
  debug: __DEV__,
  //   enableInExpoDevelopment: true,
  tracesSampleRate: 1.0,
  _experiments: {
    // profilesSampleRate is relative to tracesSampleRate.
    profilesSampleRate: 1.0,
  },
});

export default Sentry;
