import * as Sentry from "@sentry/react-native";

// -----------------------------------------------------------------------------------------------------------------------
// Notes
// -----------------------------------------------------------------------------------------------------------------------
// Using Expo 49 requires different setup for Sentry. I changed to Expo 50 as I was having issues with the previous version.
//
// Setting both tracesSampleRate and profilesSampleRate to 1.0 (100%)
// This captures all transactions and profiles for maximum insight
// Recommended for new apps to quickly identify and resolve issues
// Revisit these values as the app grows and adjust based on volume and performance needs
//
//
// Require to update app.json for plugins and hooks
//
// Docs;
// https://docs.expo.dev/guides/using-sentry/
// https://docs.sentry.io/platforms/react-native/manual-setup/expo/
//
// Issues;
// https://github.com/expo/sentry-expo/issues/368

// -----------------------------------------------------------------------------------------------------------------------
// Initialize Sentry
// -----------------------------------------------------------------------------------------------------------------------
// Sentry Configuration for New App:
Sentry.init({
  dsn: "https://ea1b1b28620ad5cc2d0abe4a46251b87@o4507800455086080.ingest.us.sentry.io/4507800459149312",
  // debug: When set to true, Sentry will print detailed debugging information
  // to the console. This is useful during development to troubleshoot issues
  // with Sentry integration. It's typically set to false in production.
  // debug: __DEV__,

  // enableInExpoDevelopment: If true, Sentry will capture and send events
  // even when running in Expo development mode (e.g., in Expo Go or dev builds).
  // By default, Sentry doesn't send events in Expo dev environments to reduce noise.
  enableInExpoDevelopment: true,
  tracesSampleRate: 1.0,
  _experiments: {
    // profilesSampleRate is relative to tracesSampleRate.
    profilesSampleRate: 1.0,
  },
});

export default Sentry;
