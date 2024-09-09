import { View, Text, StyleSheet, Image } from "react-native";
import theme from "../../data/theme.json";

// -----------------------------------------------------------------------------------------------------------------------
const DailyInfoCard = ({ item }) => {
  return (
    <View style={styles.infoCardContainer}>
      <Image
        style={styles.infoCardImage}
        source={require("../../assets/emoji/sparkles.png")}
      />
      <View style={styles.infoCardTextContainer}>
        <Text style={styles.infoCardText}>Varin is on 0-hint streak of 20 strands</Text>
      </View>
    </View>
  );
};
// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  infoCardContainer: {
    ...theme.class.ContainerCard,
    flexDirection: "row",
    alignItems: "center",
  },
  infoCardTextContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  infoCardText: {
    fontSize: theme.fontSizes.xs,
    fontWeight: "600",
    letterSpacing: theme.letterSpacing.tight,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  infoCardImage: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default DailyInfoCard;
