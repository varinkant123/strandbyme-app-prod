import { useMemo } from "react";
import { View, StyleSheet, Text } from "react-native";
import theme from "../../data/theme.json";
import BottomSheet from "@gorhom/bottom-sheet";
import AuthMain from "./AuthMain";

// -----------------------------------------------------------------------------------------------------------------------
const AuthBottomSheet = ({ bottomSheetRef, onChange }) => {
  const snapPoints = useMemo(() => ["90%"], []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      borderRadius={0}
      index={-1}
      initialSnapIndex={0}
      enablePanDownToClose={true}
      onChange={onChange}
    >
      <View style={styles.containerMain}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>Continue with one of the following options</Text>
        <AuthMain></AuthMain>
      </View>
    </BottomSheet>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  containerMain: {
    alignItems: "center",
    justifyContent: "center",
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
});

// -----------------------------------------------------------------------------------------------------------------------
export default AuthBottomSheet;
