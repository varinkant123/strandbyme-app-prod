import React from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";
import theme from "../../data/theme.json";

// -----------------------------------------------------------------------------------------------------------------------
const Input = ({ label, error, ...textInputProps }) => {
  // ---------------------------------------------------------------------------------------------------------------------
  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, error && styles.errorLabel]}>{label}</Text>}
      <TextInput
        style={[styles.input, error && styles.errorInput]}
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
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  errorLabel: {
    color: "red",
  },
  input: {
    marginTop: 4,
    height: 48,
    borderWidth: 1,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: 10,
    fontSize: 16,
    width: "100%",
    color: theme.colors.text,
    borderColor: theme.colors.gray.T300,
  },
  errorInput: {
    borderColor: "red",
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default Input;
