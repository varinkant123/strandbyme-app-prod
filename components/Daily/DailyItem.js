import { View, Text, StyleSheet, Image } from "react-native";
import theme from "../../data/theme.json";
import ImageAvatarMap from "../../data/ImageAvatar";

const emojiLightBulb = require("../../assets/emoji/light-bulb.png");

// -----------------------------------------------------------------------------------------------------------------------
const DailyItem = ({ item }) => {
  const renderCircles = (strandResult) => {
    if (strandResult == "" || strandResult == null) {
      const strandResultDummy = "GGGGGGGG";

      return strandResultDummy.split("").map((emoji, index) => (
        <View key={index} style={styles.circle}>
          {emoji === "G" && <View style={styles.grayCircle} />}
        </View>
      ));
    }

    return strandResult.split("").map((emoji, index) => (
      <View key={index} style={styles.circle}>
        {emoji === "B" && <View style={styles.blueCircle} />}
        {emoji === "Y" && <View style={styles.yellowCircle} />}
        {emoji === "L" && (
          <Image key={index} source={emojiLightBulb} style={styles.emojiImage} />
        )}
      </View>
    ));
  };

  // function to format time from seconds to minutes and seconds
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }

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
        <View style={styles.containerResultHeader}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {`${item.UserFirstName}`}
          </Text>
        </View>
        <View style={styles.emojiContainer}>{renderCircles(item.EncodedResult)}</View>
      </View>
      <View style={styles.containerResultStats}>
        <Text style={styles.timeText}>
          {item.TimeTaken === "" ? "-" : formatTime(item.TimeTaken)}
        </Text>
      </View>
    </View>
  );
};
// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  containerMain: {
    ...theme.class.ContainerCardItem,
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
  timeText: {
    fontWeight: "800",
    fontSize: theme.fontSizes.xs,
    width: 48,
    textAlign: "right",
  },
  hintsText: {
    fontSize: theme.fontSizes.xs,
    fontWeight: "600",
    width: 32,
    textAlign: "center",
  },
  containerImageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerImage: {
    position: "relative",
    backgroundColor: theme.colors.gray.T200,
    borderRadius: theme.borderRadius.md,
    padding: 4,
  },
  image: {
    height: 26,
    width: 26,
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
  containerResultStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  title: {
    fontSize: theme.fontSizes.xs,
    fontWeight: "600",
    color: theme.colors.text,
    letterSpacing: theme.letterSpacing.normal,
  },
  emojiContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 2,
  },
  emojiImage: {
    width: 14,
    height: 14,
    marginRight: 3,
  },

  // for circles using styling
  blueCircle: {
    marginVertical: 1,
    width: 12,
    height: 12,
    borderRadius: 4,
    marginRight: 3,
    backgroundColor: "#7dd3fc",
  },
  grayCircle: {
    marginVertical: 1,
    width: 12,
    height: 12,
    borderRadius: 4,
    marginRight: 3,
    backgroundColor: theme.colors.gray.T200,
  },
  yellowCircle: {
    marginVertical: 1,
    width: 12,
    height: 12,
    borderRadius: 4,
    marginRight: 3,
    backgroundColor: "#F8CB2C",
  },
  lightbulb: {
    // width: 10,
    // height: 10,
    // borderRadius: 5,
    marginRight: 3,
    // backgroundColor: "#fcd34d",
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default DailyItem;
