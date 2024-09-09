import { View, Text, StyleSheet, FlatList } from "react-native";
import theme from "../../data/theme.json";
import LeaderboardHeader from "../../components/Leaderboard/LeaderboardHeader";
import LeaderboardItem from "../../components/Leaderboard/LeaderboardItem";

// -----------------------------------------------------------------------------------------------------------------------
const GuideImage3 = () => {
  const data = [
    {
      UID: "001",
      Position: "1",
      UserFirstName: "Veronica",
      UserAvatar: "013",
      Value: 90,
    },
    {
      UID: "002",
      Position: "2",
      UserFirstName: "Varin",
      UserAvatar: "009",
      Value: 74,
    },
    {
      UID: "003",
      Position: "3",
      UserFirstName: "Amy",
      UserAvatar: "022",
      Value: 60,
    },
  ];

  return (
    <View>
      <View style={styles.containerMain}>
        <LeaderboardHeader
          title="Completion Rate"
          subtitle="Without Hints"
          value="%"
        ></LeaderboardHeader>
        <FlatList
          data={data}
          keyExtractor={(item) => item.UID.toString()}
          renderItem={({ item }) => (
            <LeaderboardItem
              item={item}
              leaderboard={"LeaderboardTotalCompletedNoHints"}
            />
          )}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  containerMain: {
    height: 160 + 48,
    backgroundColor: "#fff",
    borderRadius: theme.borderRadius.md,
    overflow: "hidden",
    paddingHorizontal: theme.main.paddingHorizontal,
    paddingTop: 12,
  },
  circlesContainer: {
    width: "100%",
    justifyContent: "flex-end",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  blueCircle: {
    backgroundColor: "#7dd3fc",
  },
  yellowCircle: {
    backgroundColor: "#fcd34d",
  },
  line: {
    height: 2,
    width: 20,
    marginHorizontal: -2,
  },
  blueLine: {
    backgroundColor: "#7dd3fc",
  },
  yellowLine: {
    backgroundColor: "#fcd34d",
  },
  containerNavbar: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray.T300,
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
  },
  textNavbarHeader: {
    color: theme.colors.gray.T400,
    fontSize: theme.fontSizes.xs,
    fontWeight: "bold",
    textAlign: "center",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
});

export default GuideImage3;
