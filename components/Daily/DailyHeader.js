import { View, Text, StyleSheet, Image } from "react-native";
import theme from "../../data/theme.json";

// -----------------------------------------------------------------------------------------------------------------------
const DailyHeader = ({ item }) => {
  return (
    <View style={styles.containerMain}>
      <Text style={styles.subheader}>Leaderboard</Text>
      <View style={styles.iconContainer}>
        <View style={styles.iconContainerHint}></View>
        <View style={styles.iconContainerTime}>
          <Text style={styles.label}>Time</Text>
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

  iconContainer: {
    flexDirection: "row",
  },

  subheader: {
    fontSize: theme.fontSizes.sm,
    color: theme.colors.text,
    fontWeight: "700",
    letterSpacing: theme.letterSpacing.tight,
    marginBottom: 12,
    textAlign: "left",
    opacity: 0.4,
  },

  iconContainerTime: {
    width: 48,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  iconContainerHint: {
    width: 32,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  // icon: {
  //   color: theme.colors.text,
  //   fontWeight: "700",
  //   opacity: 0.4,
  //   textAlign: "right",
  // },
  emojiImage: {
    width: 16,
    height: 16,
  },
  label: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: theme.letterSpacing.tight,
    opacity: 0.4,
    fontWeight: "700",
    textAlign: "center",
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default DailyHeader;
