import { useEffect } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import theme from "../../data/theme.json";
import SignupInput from "./SignupInput";
import SignupInputCountry from "./SignupInputCountry";

// -----------------------------------------------------------------------------------------------------------------------
const SignupScreenUserDetails = ({ data, updateData }) => {
  return (
    <View style={styles.containerMain}>
      <SignupInput
        label="First Name"
        value={data.find((item) => item.id === "UserFirstName").value}
        onChangeText={(value) => updateData("UserFirstName", value)}
      />
      <SignupInput
        label="Last Name"
        value={data.find((item) => item.id === "UserLastName").value}
        onChangeText={(value) => updateData("UserLastName", value)}
      />
      <SignupInputCountry label="Country" updateData={updateData} />
    </View>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  containerMain: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  title: {
    fontSize: theme.fontSizes.xl,
    fontWeight: "bold",
    color: theme.colors.text,
    letterSpacing: theme.letterSpacing.tight,
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default SignupScreenUserDetails;
