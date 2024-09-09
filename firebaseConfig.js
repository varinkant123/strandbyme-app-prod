import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
// import crashlytics from "@react-native-firebase/crashlytics";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_apiKey,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_authDomain,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_projectId,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_storageBucket,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_messagingSenderId,
  appId: process.env.EXPO_PUBLIC_FIREBASE_appId,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_measurementId,
};

let app;
if (getApps().length === 0) {
  // If no Firebase apps have been initialized, initialize one
  app = initializeApp(firebaseConfig);
} else {
  // If a Firebase app is already initialized, use that one
  app = getApp();
}

// Initialize Firebase Auth with AsyncStorage for persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export default app;

// -----------------------------------------------------------------------------------------------------------------------
/*
Firebase Configuration for Expo React Native

Steps to set up Firebase in your Expo React Native project:

1. Create a Firebase project:
   - Go to the Firebase Console (https://console.firebase.google.com/)
   - Click "Add project" and follow the setup wizard

2. Add an app to your Firebase project:
   - In your project overview, click "Add app"
   - Choose the "Web" platform (</> icon)
   - Register the app with a nickname (e.g., "ExpoReactNativeApp")
   - Firebase will provide you with a configuration object

3. Install necessary dependencies:
   npm install firebase @react-native-async-storage/async-storage
   # or
   yarn add firebase @react-native-async-storage/async-storage

4. Set up environment variables:
   - Create a .env file in your project root (if not already present)
   - Add your Firebase configuration as environment variables:
     EXPO_PUBLIC_FIREBASE_apiKey=your_api_key
     EXPO_PUBLIC_FIREBASE_authDomain=your_auth_domain
     EXPO_PUBLIC_FIREBASE_projectId=your_project_id
     EXPO_PUBLIC_FIREBASE_storageBucket=your_storage_bucket
     EXPO_PUBLIC_FIREBASE_messagingSenderId=your_messaging_sender_id
     EXPO_PUBLIC_FIREBASE_appId=your_app_id
     EXPO_PUBLIC_FIREBASE_measurementId=your_measurement_id

5. Create this Firebase config file (e.g., firebaseConfig.js)

6. Import and use this configuration in your app:
   import app from './path/to/firebaseConfig';
   import { getAuth } from 'firebase/auth';
   const auth = getAuth(app);

Note: Always use "Web" configuration for React Native projects, even though 
the app runs on mobile devices. React Native uses the JavaScript SDK, which 
is the same as the web version of Firebase.

Security: Keep your Firebase configuration secure by using environment 
variables, especially for sensitive keys and IDs. Never commit your actual 
Firebase config values to version control.

Persistence: This setup uses AsyncStorage for auth state persistence, 
which is appropriate for React Native apps.

For more information, refer to:
- Expo's Firebase documentation: https://docs.expo.dev/guides/using-firebase/
- Firebase Web SDK documentation: https://firebase.google.com/docs/web/setup
*/
