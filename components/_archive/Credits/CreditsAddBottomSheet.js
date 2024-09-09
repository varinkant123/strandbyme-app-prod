import { useMemo, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import theme from "../../data/theme.json";
import BottomSheet from "@gorhom/bottom-sheet";
import CreditsAddButtonStack from "./CreditsAddButtonStack";
import Spacer from "../UI/Spacer";

// -----------------------------------------------------------------------------------------------------------------------
const CreditsAddBottomSheet = ({ bottomSheetRef, onChange }) => {
  // align with options found as labels in CreditsAddButtonStack.js
  const [creditsButtonOption, setCreditsButtonOption] = useState("1 Credit");
  const snapPoints = useMemo(() => ["85%"], []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      borderRadius={10}
      index={-1}
      initialSnapIndex={0}
      enablePanDownToClose={true}
      onChange={onChange}
    >
      <View style={styles.containerMain}>
        <Text style={styles.title}>Add Credits</Text>
        <Text style={styles.subtitle}>Continue with one of the following options</Text>
        <Spacer height={24}></Spacer>
        <CreditsAddButtonStack
          creditsButtonOption={creditsButtonOption}
          setCreditsButtonOption={setCreditsButtonOption}
        ></CreditsAddButtonStack>
        <Spacer height={6}></Spacer>

        {/* button */}
        <View style={styles.containerButton}>
          <TouchableOpacity
            style={styles.button}
            // onPress={}
          >
            <Text style={styles.buttonText}>{"Continue"}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.disclaimerText}>
          A single credit is a reedemable token that can be used to generate a property
          valuation or refresh a previous property valuation using Zillion AI.
        </Text>
      </View>
    </BottomSheet>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  containerMain: {
    marginHorizontal: 18,
    marginVertical: 24,
  },

  title: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.xl,
    letterSpacing: theme.letterSpacing.tight,
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
  },

  subtitle: {
    marginTop: 6,
    color: theme.colors.text,
    opacity: theme.colors.textSecondaryOpacity,
    fontSize: theme.fontSizes.sm,
    letterSpacing: theme.letterSpacing.tight,
    textAlign: "center",
    width: "100%",
  },

  containerButton: {
    // paddingHorizontal: 20,
  },

  button: {
    backgroundColor: "black",
    paddingVertical: 12,
    borderRadius: 6,
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    width: "100%",
    textAlign: "center",
  },
  disclaimerText: {
    marginTop: 18,
    color: theme.colors.gray.T400,
    fontSize: theme.fontSizes.xs,
    lineHeight: theme.fontSizes.xs * theme.lineHeights.dense,
    letterSpacing: theme.letterSpacing.tight,
    textAlign: "center",
    width: "100%",
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default CreditsAddBottomSheet;
