import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import theme from "../../data/theme.json";

// -----------------------------------------------------------------------------------------------------------------------
const LeaderboardItem = ({ item }) => {
  const navigation = useNavigation();

  // Function to render medal images
  const renderEmoji = (count) => {
    const emojiMap = {
      A: require("../../assets/emoji/medal-star.png"),
      B: require("../../assets/emoji/medal.png"),
    };

    // Construct an array of emojis with 'A' at every 10th position, then followed by 'B's
    const strandResult = [];
    const numStars = Math.floor(count / 5);
    const numMedals = count - numStars * 5;

    for (let i = 0; i < numStars; i++) {
      strandResult.push("A");
    }

    for (let i = 0; i < numMedals; i++) {
      strandResult.push("B");
    }

    return strandResult.map((emoji, index) => (
      <Image key={index} source={emojiMap[emoji]} style={styles.emojiImage} />
    ));
  };

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("PlayerRequests", { GID: item.uid });
      }}
    >
      <View style={styles.containerMain}>
        <View style={styles.containerImage}>
          <Image style={styles.image} source={item.image} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {item.name}
          </Text>
          <View style={styles.emojiContainer}>{renderEmoji(item.strandDailyWins)}</View>
        </View>
        <View style={styles.rankBadge}>
          <Text style={styles.rankText}>{item.rank}</Text>
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
  rankBadge: {
    borderRadius: 6,
    width: 20,
    alignItems: "flex-end",
  },
  rankText: {
    fontWeight: "bold",
    opacity: 0.25,
    fontSize: theme.fontSizes.xs,
  },
  containerImage: {
    marginTop: 0,
    justifyContent: "flex-end",
    alignContent: "flex-end",
    // https://colorhunt.co/palette/fd8a8af1f7b5a8d1d19ea1d4
    backgroundColor: "#9EA1D4",
    borderRadius: theme.borderRadius.md,
    padding: 4,
  },
  image: {
    height: 32,
    width: 32,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 20,
  },
  title: {
    fontSize: theme.fontSizes.sm,
    fontWeight: "bold",
    color: theme.colors.text,
    letterSpacing: theme.letterSpacing.normal,
  },
  description: {
    width: "100%",
    letterSpacing: theme.letterSpacing.normal,
    marginTop: 4,
  },
  emojiContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
  },
  emojiImage: {
    width: 18,
    height: 18,
    marginRight: 2,
    marginBottom: 2,
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default LeaderboardItem;
