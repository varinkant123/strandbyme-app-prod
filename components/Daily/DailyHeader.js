import { View, Text, StyleSheet, Image } from "react-native";
import theme from "../../data/theme.json";

// -----------------------------------------------------------------------------------------------------------------------
const DailyHeader = ({ item }) => {
  return (
    <View style={styles.containerMain}>
      <Text style={styles.subheader}>Leaderboard</Text>
      <Text style={styles.subheaderLower}>Mins</Text>
    </View>
  );
};
// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  containerMain: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  subheader: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text,
    fontWeight: "700",
    letterSpacing: theme.letterSpacing.tight,
    marginBottom: 18,
    textAlign: "left",
    opacity: 0.4,
  },

  subheaderLower: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.text,
    fontWeight: "700",
    letterSpacing: theme.letterSpacing.tight,
    marginTop: 4,
    marginBottom: 18,
    textAlign: "left",
    opacity: 0.4,
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default DailyHeader;
