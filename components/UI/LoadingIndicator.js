import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import theme from "../../data/theme.json";

// -----------------------------------------------------------------------------------------------------------------------
const LoadingIndicator = () => {
  // ---------------------------------------------------------------------------------------------------------------------
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={theme.colors.text} />
    </View>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default LoadingIndicator;
