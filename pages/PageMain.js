import { React, useState, useRef, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import theme from "../data/theme.json";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// -----------------------------------------------------------------------------------------------------------------------
import PageDaily from "./PageMain/PageDaily";
import PageLeaderboard from "./PageMain/PageLeaderboard";
import PageSearch from "./PageMain/PageSearch";
import PageAccountMainMenu from "./PageAccount/PageAccountMainMenu";

// -----------------------------------------------------------------------------------------------------------------------
const Tab = createBottomTabNavigator();

const styleIconSize = 32;

const PageMain = () => {
  // ---------------------------------------------------------------------------------------------------------------------
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white", paddingTop: 0 }}>
      <Tab.Navigator
        initialRouteName="Daily"
        // https://reactnavigation.org/docs/bottom-tab-navigator/
        screenOptions={{
          tabBarStyle: {
            borderTopWidth: 0, // Removes the border line at the top
            elevation: 0, // Removes shadow on Android
            shadowOpacity: 0, // Removes shadow on iOS
            height: 70,
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 12,
            paddingBottom: 0,
          },
          tabBarLabelStyle: {
            fontWeight: 600,
            fontSize: 12,
            marginTop: 0,
            letterSpacing: -0.3,
          },
          tabBarShowLabel: false,
          tabBarActiveTintColor: theme.colors.primary, // Color of the tab when active
          tabBarInactiveTintColor: theme.colors.gray.T300, // Color of the tab when inactive
        }}
      >
        <Tab.Screen
          name="Search"
          component={PageSearch}
          options={{
            headerShown: false,
            tabBarLabel: "Search",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="magnify" color={color} size={styleIconSize} />
            ),
          }}
        />
        <Tab.Screen
          name="Daily"
          component={PageDaily}
          options={{
            headerShown: false,
            tabBarLabel: "Daily Stats",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                // name="motion-play-outline"
                name="circle-multiple"
                color={color}
                size={styleIconSize}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Leaderboard"
          component={PageLeaderboard}
          options={{
            headerShown: false,
            tabBarLabel: "Leaderboard",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="account-group"
                color={color}
                size={styleIconSize}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={PageAccountMainMenu}
          options={{
            headerShown: false,
            tabBarLabel: "Settings",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="cog" color={color} size={styleIconSize} />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust opacity here
  },
});

// -----------------------------------------------------------------------------------------------------------------------

export default PageMain;

// -----------------------------------------------------------------------------------------------------------------------
// DOCS;
// https://reactnavigation.org/docs/bottom-tab-navigator
// https://static.enapter.com/rn/icons/material-community.html
