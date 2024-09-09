import { View, Text, StyleSheet, Image } from "react-native";
import theme from "../../data/theme.json";
import ImageAvatarMap from "../../data/ImageAvatar";
import LeaderboardItemFormatValue from "./LeaderboardItemFormatValue";

// -----------------------------------------------------------------------------------------------------------------------
const LeaderboardItem = ({ item, leaderboard }) => {
  return (
    <View style={styles.containerMain}>
      <View style={styles.containerImageHeader}>
        <View style={styles.containerRank}>
          <Text style={styles.rankText}>
            {item.Position === "" ? "-" : item.Position}
          </Text>
        </View>
        <View style={styles.containerImage}>
          <Image style={styles.image} source={ImageAvatarMap[item.UserAvatar]} />
        </View>
      </View>
      <View style={styles.containerResult}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {`${item.UserFirstName}`}
        </Text>
      </View>
      <View style={styles.containerResultStats}>
        <Text style={styles.valueText}>
          {item.Value === null
            ? "-"
            : LeaderboardItemFormatValue(item.Value, leaderboard)}
        </Text>
      </View>
    </View>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  containerMain: {
    ...theme.class.ContainerCardItem,
    marginBottom: 18,
  },
  containerImageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerRank: {
    alignSelf: "center",
    marginRight: 6,
    width: 16,
  },
  rankText: {
    fontFamily: "AntonSC",
    fontSize: theme.fontSizes.sm,
    fontWeight: "700",
  },
  containerImage: {
    position: "relative",
    backgroundColor: theme.colors.gray.T200,
    borderRadius: theme.borderRadius.md,
    padding: 4,
  },
  image: {
    height: 24,
    width: 24,
  },
  containerResult: {
    flex: 1,
    paddingLeft: 12,
    overflow: "hidden",
  },
  title: {
    fontSize: theme.fontSizes.xs,
    fontWeight: "600",
    color: theme.colors.text,
    letterSpacing: theme.letterSpacing.normal,
  },
  containerResultStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  valueText: {
    fontWeight: "600",
    fontSize: theme.fontSizes.xs,
    width: 48,
    textAlign: "right",
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default LeaderboardItem;
