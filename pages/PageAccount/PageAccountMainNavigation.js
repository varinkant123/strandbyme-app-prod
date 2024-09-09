import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { fullScreenOptions, secondaryScreenOptions } from "../../data/HeaderOptions";

// -----------------------------------------------------------------------------------------------------------------------
import PageAccountMainMenu from "./PageAccountMainMenu";
import PageAccountName from "./Secondary/PageAccountName";
import PageAccountLocation from "./Secondary/PageAccountLocation";
import PageAccountAvatar from "./Secondary/PageAccountAvatar";
import PageAccountFriends from "./Secondary/PageAccountFriends";
import PageAccountAbout from "./Secondary/PageAccountAbout";

// -----------------------------------------------------------------------------------------------------------------------
const PageAccountMainNavigation = ({ route }) => {
  const { PID } = route.params;
  const AccountStack = createStackNavigator();

  return (
    <AccountStack.Navigator>
      <AccountStack.Screen
        name="AccountMainMenu"
        component={PageAccountMainMenu}
        options={fullScreenOptions}
      />
      <AccountStack.Screen
        name="AccountName"
        component={PageAccountName}
        options={secondaryScreenOptions("Name", true, "modal")}
      />
      <AccountStack.Screen
        name="AccountLocation"
        component={PageAccountLocation}
        options={secondaryScreenOptions("Location", true, "modal")}
      />
      <AccountStack.Screen
        name="AccountAvatar"
        component={PageAccountAvatar}
        options={secondaryScreenOptions("Avatar", true, "modal")}
      />
      <AccountStack.Screen
        name="AccountFriends"
        component={PageAccountFriends}
        options={secondaryScreenOptions("Friends", true, "modal")}
      />
      <AccountStack.Screen
        name="AccountAbout"
        component={PageAccountAbout}
        options={secondaryScreenOptions("About", true, "modal")}
      />
    </AccountStack.Navigator>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({});

// -----------------------------------------------------------------------------------------------------------------------
export default PageAccountMainNavigation;
