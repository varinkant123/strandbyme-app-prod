import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import theme from "../../data/theme.json";

// -----------------------------------------------------------------------------------------------------------------------
const DailyItem = ({ item }) => {
  const navigation = useNavigation();

  const renderEmoji = (strandResult) => {
    const emojiMap = {
      B: require("../../assets/emoji/circle-blue.png"),
      Y: require("../../assets/emoji/circle-yellow.png"),
      L: require("../../assets/emoji/light-bulb.png"),
    };

    return strandResult
      .split("")
      .map((emoji, index) => (
        <Image key={index} source={emojiMap[emoji]} style={styles.emojiImage} />
      ));
  };

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("PlayerRequests", { GID: "12190390812" });
      }}
    >
      <View style={styles.containerMain}>
        <View style={styles.containerImageHeader}>
          <View style={styles.containerRank}>
            <Text style={styles.rankText}>{item.rank}</Text>
          </View>
          <View style={styles.containerImage}>
            <Image style={styles.image} source={item.image} />
          </View>
        </View>
        <View style={styles.containerResult}>
          <View style={styles.containerResultHeader}>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              {item.name}
            </Text>
            <View>
              <Text style={styles.timeText}>{item.time}</Text>
            </View>
          </View>
          <View style={styles.emojiContainer}>{renderEmoji(item.strandResult)}</View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  containerMain: {
    ...theme.class.ContainerCardItem,
  },
  containerRank: {
    alignSelf: "center",
    marginRight: 12,
  },
  rankText: {
    fontSize: theme.fontSizes.xs,
    fontWeight: "700",
  },
  timeText: {
    fontWeight: "600",
    paddingTop: 1,
    fontSize: theme.fontSizes.xs,
  },
  containerImageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerImage: {
    position: "relative",
    backgroundColor: "#9EA1D4",
    borderRadius: theme.borderRadius.md,
    padding: 4,
  },
  image: {
    height: 32,
    width: 32,
  },
  containerResult: {
    flex: 1,
    paddingLeft: 12,
    overflow: "hidden",
  },
  containerResultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: theme.fontSizes.sm,
    fontWeight: "600",
    color: theme.colors.text,
    letterSpacing: theme.letterSpacing.normal,
  },
  emojiContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
  },
  emojiImage: {
    width: 14,
    height: 14,
    marginRight: 2,
    marginBottom: 4,
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default DailyItem;
