import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import NavigationManager from "./pages/NavigationManager";
import { AuthUserProvider } from "./components/Auth/AuthUserContext";
import { useFonts } from "expo-font";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import Sentry from "./sentryConfig";
import LoadingIndicator from "./components/UI/LoadingIndicator";

// -----------------------------------------------------------------------------------------------------------------------
// Initialize Query Client for React Query
const queryClient = new QueryClient();

// -----------------------------------------------------------------------------------------------------------------------
function App() {
  // load fonts
  const [fontsLoaded] = useFonts({
    AntonSC: require("./assets/font/AntonSC-Regular.ttf"),
  });

  // If the font isn't loaded, show a loading screen
  if (!fontsLoaded) {
    return <LoadingIndicator></LoadingIndicator>;
  }

  // main app
  return (
    <QueryClientProvider client={queryClient}>
      <AuthUserProvider>
        <NavigationContainer>
          <NavigationManager />
        </NavigationContainer>
      </AuthUserProvider>
    </QueryClientProvider>
  );
}

// export default Sentry.wrap(App);
export default App;

// -----------------------------------------------------------------------------------------------------------------------
// import AsyncStorage from "@react-native-async-storage/async-storage";
// Clerk setup for authentication
// Define the token cache using expo-secure-store
// const tokenCache = {
//   async getToken(key) {
//     try {
//       const value = await AsyncStorage.getItem(key);
//       return value;
//     } catch (error) {
//       console.error("Error retrieving data", error);
//       return null;
//     }
//   },
//   async saveToken(key, value) {
//     try {
//       await AsyncStorage.setItem(key, value);
//     } catch (error) {
//       console.error("Error saving data", error);
//     }
//   },
// };
