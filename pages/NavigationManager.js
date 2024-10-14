import { React, useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { fullScreenOptions, secondaryScreenOptions } from "../data/HeaderOptions";
import { useAuthUser } from "../components/Auth/AuthUserContext";
import api from "../api/api";
import { useNavigation } from "@react-navigation/native";

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
  // const { uid, loading: authLoading, isSignedIn } = useAuthUser();

  // ---------------------------------------------------------------------------------------------------------------------
  // loading screen
  // if (authLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }

  // ---------------------------------------------------------------------------------------------------------------------
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={PageWelcome} options={fullScreenOptions} />
      <Stack.Screen name="SignUp" component={PageSignUp} options={fullScreenOptions} />
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
    </Stack.Navigator>
  );
};

export default NavigationManager;
