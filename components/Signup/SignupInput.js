import React from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";
import theme from "../../data/theme.json";
import Spacer from "../UI/Spacer";

// -----------------------------------------------------------------------------------------------------------------------
const SignupInput = ({ label, ...textInputProps }) => {
  // ---------------------------------------------------------------------------------------------------------------------
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Spacer height={0} />
      <TextInput
        selectionColor={theme.colors.primary}
        spellCheck={false} // Disable spell check
        autoCorrect={false} // Disable auto correct
        style={[styles.input]}
        {...textInputProps} // Spread operator to pass down all other props to TextInput
      />
    </View>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.gray.T400,
    letterSpacing: theme.letterSpacing.tight,
  },
  input: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderColor: theme.colors.gray.T300,
    borderBottomWidth: 1,
    marginBottom: 24,
    fontSize: theme.fontSizes.lg,
    fontWeight: "500",
    paddingTop: 4,
    paddingBottom: 8,
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default SignupInput;
