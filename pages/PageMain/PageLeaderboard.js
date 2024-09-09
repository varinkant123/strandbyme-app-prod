import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import theme from "../../data/theme.json";
import Header from "../../components/Header/Header";
import LeaderboardItem from "../../components/Leaderboard/LeaderboardItem";
import LeaderboardCustomInput from "../../components/Leaderboard/LeaderboardCustomInput";
import LeaderboardHeader from "../../components/Leaderboard/LeaderboardHeader";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { format, addMonths } from "date-fns";
import LoadingIndicator from "../../components/UI/LoadingIndicator";
import { useAuthUser } from "../../components/Auth/AuthUserContext";
import api from "../../api/api";
import _ from "lodash";

// -----------------------------------------------------------------------------------------------------------------------
// using the useQuery hook to get the data from the api
const fetchResults = async ({ queryKey }) => {
  const [_key, UID, yearMonth] = queryKey;

  // Check if yearMonthDate is a valid Date
  if (isNaN(yearMonth.getTime())) {
    console.error("Invalid yearMonth:", yearMonth);
    throw new Error("Invalid date provided");
  }
  // as year month is a date object we need to format it to YYYYMM for the api
  const yearMonthFormatted = format(yearMonth, "yyyyMM");

  const response = await api.get(
    `/results/${UID}/leaderboard/monthly/${yearMonthFormatted}`
  );
  return response.data;
};

const useMonthlyResults = (UID, yearMonth) => {
  return useQuery({
    queryKey: ["monthlyResults", UID, yearMonth],
    queryFn: fetchResults,
    staleTime: 1000 * 60 * 60, // 1 hour
    cacheTime: 1000 * 60 * 60 * 24, // 1 day
  });
};

// -----------------------------------------------------------------------------------------------------------------------
const PageLeaderboard = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [yearMonth, setYearMonth] = useState(new Date());
  const { uid } = useAuthUser();
  const { data, error, isLoading, refetch } = useMonthlyResults(uid, yearMonth);

  // -----------------------------------------------------------------------------------------------------------------------
  const handlePressPrevious = () => {
    // if it is the last date then do not proceed - this is hardcoded
    const yearMonthFloor = new Date(2024, 8, 1);
    if (yearMonth <= yearMonthFloor) return;
    // go back a month to year month date object
    const newDate = addMonths(yearMonth, -1);
    setYearMonth(newDate);
  };

  const handlePressNext = () => {
    // if it is the current date then do not proceed
    const yearMonthCeiling = new Date();
    if (yearMonth >= yearMonthCeiling) return;
    // add a month to year month date object
    const newDate = addMonths(yearMonth, 1);
    setYearMonth(newDate);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // -----------------------------------------------------------------------------------------------------------------------
  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <Text>Error</Text>;
  }

  return (
    <ScrollView
      style={styles.containerMain}
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <Header title="Monthly Stats" />
      <LeaderboardCustomInput
        yearMonth={yearMonth.toISOString()}
        handlePressNext={handlePressNext}
        handlePressPrevious={handlePressPrevious}
      ></LeaderboardCustomInput>

      {/* Leadearboard for Total Strands Completed */}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("LeaderboardDetail", {
            title: "Leaderboard",
            subtitle: "Daily Wins",
            value: "Total",
            data: data.LeaderboardTotal,
          })
        }
      >
        <View style={styles.listOuterContainer}>
          <LeaderboardHeader
            title="Completions"
            subtitle="Strands"
            value="Total"
          ></LeaderboardHeader>
          <FlatList
            data={_.take(data.LeaderboardTotal, 3)}
            keyExtractor={(item) => item.UID.toString()}
            renderItem={({ item }) => (
              <LeaderboardItem item={item} leaderboard="LeaderboardTotal" />
            )}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        </View>
      </TouchableOpacity>

      {/* Leadearboard for % of Strands Without Hints */}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("LeaderboardDetail", {
            title: "Completion Rate",
            subtitle: "Without Hints",
            value: "%",
            data: data.LeaderboardTotalCompletedNoHints,
          })
        }
      >
        <View style={styles.listOuterContainer}>
          <LeaderboardHeader
            title="Completion Rate"
            subtitle="Without Hints"
            value="%"
          ></LeaderboardHeader>
          <FlatList
            data={_.take(data.LeaderboardTotalCompletedNoHints, 3)}
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
      </TouchableOpacity>

      {/* Leaderboard for Avergare Time Taken to Complete Strands */}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("LeaderboardDetail", {
            title: "Time",
            subtitle: "Average",
            value: "Mins",
            data: data.LeaderboardAverageTime,
          })
        }
      >
        <View style={styles.listOuterContainer}>
          <LeaderboardHeader
            title="Time"
            subtitle="Average"
            value="Mins"
          ></LeaderboardHeader>
          <FlatList
            data={_.take(data.LeaderboardAverageTime, 3)}
            keyExtractor={(item) => item.UID.toString()}
            renderItem={({ item }) => (
              <LeaderboardItem item={item} leaderboard={"LeaderboardAverageTime"} />
            )}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        </View>
      </TouchableOpacity>

      {/* Leaderboard for Best Time Taken to Complete Strands */}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("LeaderboardDetail", {
            title: "Time",
            subtitle: "Best",
            value: "Mins",
            data: data.LeaderboardBestTime,
          })
        }
      >
        <View style={styles.listOuterContainer}>
          <LeaderboardHeader
            title="Time"
            subtitle="Best"
            value="Mins"
          ></LeaderboardHeader>
          <FlatList
            data={_.take(data.LeaderboardBestTime, 3)}
            keyExtractor={(item) => item.UID.toString()}
            renderItem={({ item }) => (
              <LeaderboardItem item={item} leaderboard={"LeaderboardBestTime"} />
            )}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};
// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  containerMain: {
    width: "100%",
    paddingHorizontal: theme.main.paddingHorizontal,
    backgroundColor: theme.colors.background,
  },

  listOuterContainer: {
    ...theme.class.ContainerCard,
  },
});
// -----------------------------------------------------------------------------------------------------------------------
export default PageLeaderboard;

// -----------------------------------------------------------------------------------------------------------------------
// this is for leaderboard for daily wins not implemented yet
{
  /* <TouchableOpacity
  onPress={() =>
    navigation.navigate("LeaderboardDetail", {
      title: "Leaderboard",
      subtitle: "Daily Wins",
      value: "Total",
      data: dataDailyWins,
    })
  }
>
  <View style={styles.listOuterContainer}>
    <LeaderboardHeader
      title="Leaderboard"
      subtitle="Daily Wins"
      value="Total"
    ></LeaderboardHeader>
    <FlatList
      data={dataDailyWins}
      keyExtractor={(item) => item.uid.toString()}
      renderItem={({ item }) => <LeaderboardItem item={item} />}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
    />
  </View>
</TouchableOpacity>; */
}
