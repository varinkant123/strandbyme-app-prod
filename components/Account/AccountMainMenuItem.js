import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import theme from "../../data/theme.json";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useAuthUser } from "../Auth/AuthUserContext";
// -----------------------------------------------------------------------------------------------------------------------
const AccountMainMenuItem = ({ item, isLastItem }) => {
  const navigation = useNavigation();
  const { handleSignOut } = useAuthUser();

  // onPressHandler base on the item type
  const onPressHandler = () => {
    if (item.id === "account_logout") {
      // handle logout action
      handleSignOut();
    } else if (item.id === "account_delete") {
      // ACCOUNT DELTE NOT IMPLEMENTED
      // handle delete account action
      // if (Platform.OS === "ios") {
      //   // show alert dialog
      //   Alert.alert("Delete account", "Are you sure you want to delete your account?", [
      //     {
      //       text: "Cancel",
      //       style: "cancel",
      //       onPress: () => console.log("Cancel Pressed"),
      //     },
      //     {
      //       text: "Delete",
      //       style: "destructive",
      //       onPress: () => console.log("Delete Pressed"),
      //     },
      //   ]); // end of Alert.alert
      // } else if (Platform.OS === "android") {
      //   // show alert dialog
      //   Alert.alert("Delete account", "Are you sure you want to delete your account?", [
      //     {
      //       text: "Cancel",
      //       style: "cancel",
      //       onPress: () => console.log("Cancel Pressed"),
      //     },
      //     {
      //       text: "Delete",
      //       style: "destructive",
      //       onPress: () => console.log("Delete Pressed"),
      //     },
      //   ]);
      // } // end of Alert.alert
    } else {
      // navigate to the page
      navigation.navigate("AccountMainNavigation", { screen: item.page });
    }
  };

  return (
    <TouchableOpacity
      onPress={onPressHandler}
      style={[
        styles.containerMain,
        !isLastItem && styles.bottomBorder,
        isLastItem && styles.isLastItem,
      ]}
    >
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <MaterialCommunityIcons
          name={"chevron-right"}
          size={24}
          color={theme.colors.gray.T600}
        />
      </View>
    </TouchableOpacity>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  containerMain: {
    ...theme.class.ContainerCardItem,
    height: 48,
    marginBottom: 0,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray.T100,
    width: "100%",
  },
  isLastItem: {
    borderBottomWidth: 0,
    marginBottom: 0,
    paddingBottom: 0,
  },
  title: {
    fontSize: theme.fontSizes.sm,
    fontWeight: "600",
    color: theme.colors.text,
    letterSpacing: theme.letterSpacing.tight,
    textAlign: "left",
  },
  value: {
    fontSize: theme.fontSizes.sm,
    fontWeight: "600",
    color: theme.colors.text,
    letterSpacing: theme.letterSpacing.tight,
    textAlign: "left",
    opacity: theme.colors.textSecondaryOpacity,
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default AccountMainMenuItem;
