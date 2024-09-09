import { View, StyleSheet, FlatList } from "react-native";
import theme from "../../data/theme.json";
import LeaderboardHeader from "../../components/Leaderboard/LeaderboardHeader";
import LeaderboardItem from "../../components/Leaderboard/LeaderboardItem";
import _ from "lodash";

// -----------------------------------------------------------------------------------------------------------------------
const PageLeaderboardDetail = ({ route }) => {
  const { data, title, subtitle, value } = route.params;

  // UAT - for testing multiplication of data
  // const dataMultiplied = _.flatten(
  //   Array(100)
  //     .fill(data)
  //     .map((group, groupIndex) =>
  //       group.map((item, itemIndex) => ({
  //         ...item,
  //         Position: groupIndex * data.length + item.Position,
  //         UID: `generated_${groupIndex}_${itemIndex}`,
  //         Value: Math.floor(Math.random() * 100), // Random value between 0 and 99
  //       }))
  //     )
  // );

  return (
    <View style={styles.containerMain}>
      <LeaderboardHeader
        title={title}
        subtitle={subtitle}
        value={value}
      ></LeaderboardHeader>
      <FlatList
        data={data}
        keyExtractor={(item) => item.UID.toString()}
        renderItem={({ item }) => <LeaderboardItem item={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  containerMain: {
    ...theme.class.PageSecondaryContainer,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: theme.main.paddingHorizontal + 4,
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default PageLeaderboardDetail;
