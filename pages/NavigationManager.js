import { React, useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { fullScreenOptions, secondaryScreenOptions } from "../data/HeaderOptions";
import { useAuthUser } from "../components/Auth/AuthUserContext";
import api from "../api/api";

// -----------------------------------------------------------------------------------------------------------------------
import PageWelcome from "./PageWelcome";
import PageGuide from "./PageGuide";
import PageSignUp from "./PageSignUp";
import PageMain from "./PageMain";
import PageAccountMainNavigation from "./PageAccount/PageAccountMainNavigation";
import PageStrands from "./PageMain/PageStrands";
import PageLeaderboardDetail from "./PageSecondary/PageLeaderboardDetail";

// -----------------------------------------------------------------------------------------------------------------------
const Stack = createStackNavigator();

const NavigationManager = () => {
  const { uid, loading: authLoading, isSignedIn } = useAuthUser();
  const [initialRouteName, setInitialRouteName] = useState("Welcome");
  const [loading, setLoading] = useState(true);

  // ---------------------------------------------------------------------------------------------------------------------
  // intial route name based on user login status and if user has completed onboarding
  useEffect(() => {
    // function which sets intital route name based on user login status and if user has completed onboarding
    const intializeNavigation = async () => {
      if (isSignedIn && uid) {
        try {
          const response = await api.get(`/user/${uid}`, {
            params: {
              attribute: "SignupCompleted",
            },
          });
          if (response.data.SignupCompleted === "true") {
            setInitialRouteName("Main");
          } else {
            setInitialRouteName("PageSignUp");
          }
        } catch (error) {
          console.error("Error checking signup status:", error);
        }
      }
      setLoading(false);
    };

    // only run when auth loading is false otherwise default to state which is Welcome page
    if (!authLoading) {
      intializeNavigation();
    }
  }, [isSignedIn, authLoading]);

  // ---------------------------------------------------------------------------------------------------------------------
  // loading screen
  if (loading || authLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // ---------------------------------------------------------------------------------------------------------------------
  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      {isSignedIn ? (
        <>
          <Stack.Screen
            name="SignUp"
            component={PageSignUp}
            options={fullScreenOptions}
          />
          <Stack.Screen name="Guide" component={PageGuide} options={fullScreenOptions} />
          <Stack.Screen
            name="Strands"
            component={PageStrands}
            options={secondaryScreenOptions("Strands", true, "modal", 60)}
          />
          <Stack.Screen name="Main" component={PageMain} options={fullScreenOptions} />
          <Stack.Screen
            name="AccountMainNavigation"
            component={PageAccountMainNavigation}
            options={secondaryScreenOptions("Main", false, "modal")}
          />
          <Stack.Screen
            name="LeaderboardDetail"
            component={PageLeaderboardDetail}
            options={secondaryScreenOptions("Leaderboard", true, "modal")}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Welcome"
            component={PageWelcome}
            options={fullScreenOptions}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default NavigationManager;

// -----------------------------------------------------------------------------------------------------------------------
// You can control the navigation flow based on the user's login status in React Native using the React Navigation library
// and your AuthUserContext. However, you cannot directly access the useAuthUser hook within the App component itself because
// it is the same component where the AuthUserProvider is provided. The context (and thus the hook) is only available to the
// children of the provider, not to the provider component itself. To achieve this, you can create a separate component that
// consumes the context and manages the navigation stack

// {user && user.loggedIn ? (
//   <>
//     <Stack.Screen name="PageMain" component={PageMain} />
//     {/* Other screens available after login */}
//   </>
// ) : (
//   <>
//     <Stack.Screen name="AddProperty" component={PageAddProperty} />
//     <Stack.Screen name="PageMain" component={PageMain} />
//     {/* Other screens available before login */}
//   </>
// )}
