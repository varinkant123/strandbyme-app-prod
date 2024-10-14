import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import theme from "../../data/theme.json";
import { useNavigation } from "@react-navigation/native";

// -----------------------------------------------------------------------------------------------------------------------
const DailyPlay = ({ puzzleCompleted }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (!puzzleCompleted) {
      Alert.alert(
        "Strands Completed",
        "You've already completed today's Strands puzzle!"
      );
    } else {
      navigation.navigate("Strands");
    }
  };

  return (
    <>
      <TouchableOpacity style={styles.fab} onPress={handlePress}>
        <MaterialCommunityIcons name="play" size={28} color="white" />
      </TouchableOpacity>
    </>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    right: 32,
    bottom: 24,
    backgroundColor: theme.colors.active,
    borderRadius: 18,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default DailyPlay;
