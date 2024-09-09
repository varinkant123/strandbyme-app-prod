import { View, Text, StyleSheet } from "react-native";
import theme from "../../data/theme.json";

// -----------------------------------------------------------------------------------------------------------------------
const LeaderboardHeader = ({ title, subtitle, value }) => {
  return (
    <View style={styles.containerMain}>
      <View style={styles.subheaderContainer}>
        <Text style={styles.subheader}>{title}</Text>
        <Text style={styles.subheaderSecondary}>{subtitle}</Text>
      </View>

      <View style={styles.columnContainer}>
        <View style={styles.columnContainerValue}>
          <Text style={styles.label}>{value}</Text>
        </View>
      </View>
    </View>
  );
};
// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  containerMain: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  columnContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  subheaderContainer: {
    flexDirection: "column",
  },

  subheader: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text,
    fontWeight: "700",
    letterSpacing: theme.letterSpacing.tight,
    textAlign: "left",
    opacity: 0.4,
  },
  subheaderSecondary: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.text,
    fontWeight: "700",
    letterSpacing: theme.letterSpacing.tight,
    marginBottom: 12,
    textAlign: "left",
    opacity: 0.4,
  },
  columnContainerValue: {
    width: 48,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: theme.letterSpacing.tight,
    opacity: 0.4,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default LeaderboardHeader;
