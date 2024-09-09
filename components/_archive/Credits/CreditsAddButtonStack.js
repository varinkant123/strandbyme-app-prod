import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import theme from "../../data/theme.json";
import CreditsAddButton from "./CreditsAddButton";

// -----------------------------------------------------------------------------------------------------------------------
const CreditsAddButtonStack = ({ creditsButtonOption, setCreditsButtonOption }) => {
  return (
    <View style={styles.container}>
      <CreditsAddButton
        label="1 Credit"
        amount="$14.99"
        badge={null}
        creditsButtonOption={creditsButtonOption}
        setCreditsButtonOption={setCreditsButtonOption}
      />
      <CreditsAddButton
        label="3 Credits"
        amount="$30.99"
        badge="Save 30%"
        creditsButtonOption={creditsButtonOption}
        setCreditsButtonOption={setCreditsButtonOption}
      />
      <CreditsAddButton
        label="10 Credits"
        amount="$74.99"
        badge="Save 50%"
        creditsButtonOption={creditsButtonOption}
        setCreditsButtonOption={setCreditsButtonOption}
      />
    </View>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default CreditsAddButtonStack;
