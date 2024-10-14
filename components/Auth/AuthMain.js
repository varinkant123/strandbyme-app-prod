import { useEffect, useState } from "react";
import { View, Button, StyleSheet, Platform, Text } from "react-native";
import theme from "../../data/theme.json";
// import AuthButtonSocialGoogle from "./AuthButtonSocialGoogle";
import AuthButtonSocialApple from "./AuthButtonSocialApple";
import AuthEmailPassword from "./AuthEmailPassword";
import AuthLineSeperator from "./AuthLineSeperator";
import Spacer from "../UI/Spacer";
import LoadingIndicator from "../UI/LoadingIndicator";

// -----------------------------------------------------------------------------------------------------------------------
const AuthMain = ({ setLoading }) => {
  // ---------------------------------------------------------------------------------------------------------------------
  return (
    <View style={styles.main}>
      <AuthEmailPassword setLoading={setLoading}></AuthEmailPassword>
      <AuthLineSeperator text="OR"></AuthLineSeperator>
      {/* <AuthButtonSocialGoogle></AuthButtonSocialGoogle> */}
      {/* <Spacer height={12} /> */}
      {Platform.OS === "ios" && <AuthButtonSocialApple></AuthButtonSocialApple>}
    </View>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  main: {
    width: "100%",
    marginTop: 36,
    alignItems: "center",
    justifyContent: "center",
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default AuthMain;
