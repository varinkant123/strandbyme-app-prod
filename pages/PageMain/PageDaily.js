import { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, ScrollView, RefreshControl } from "react-native";
import { useQuery } from "@tanstack/react-query";
import theme from "../../data/theme.json";
import Header from "../../components/Header/Header";
import DailyItem from "../../components/Daily/DailyItem";
import DailyCustomInput from "../../components/Daily/DailyCustomInput";
import DailyPlay from "../../components/Daily/DailyPlay";
import ModalGeneric from "../../components/Modal/ModalGeneric";
import api from "../../api/api";
import { getPIDOnDevice } from "../../utils/PID/getPIDOnDevice";
import { changePIDOnDevice } from "../../utils/PID/changePIDOnDevice";
import { useAuthUser } from "../../components/Auth/AuthUserContext";
import LoadingIndicator from "../../components/UI/LoadingIndicator";
import { useNavigation } from "@react-navigation/native";
import ShadowLineSeperator from "../../components/UI/ShadowLineSeperator";
import DailyHeader from "../../components/Daily/DailyHeader";

// -----------------------------------------------------------------------------------------------------------------------
// using the useQuery hook to get the data from the api
const fetchResults = async ({ queryKey }) => {
  const [_key, UID, PID] = queryKey;
  const response = await api.get(`/results/${UID}/${PID}/leaderboard/daily`);
  return response.data;
};

const useDailyResults = (UID, PID) => {
  return useQuery({
    queryKey: ["dailyResults", UID, PID],
    queryFn: fetchResults,
    staleTime: 1000 * 60 * 60, // 1 hour
    cacheTime: 1000 * 60 * 60 * 24, // 1 day
  });
};

// -----------------------------------------------------------------------------------------------------------------------
const PageDaily = () => {
  // determine the default value of the PID as the latest by converting the date to puzzle id, note this will be based
  // on the local date and time found on the device
  const [PID, setPID] = useState(getPIDOnDevice());
  const [showModal, setShowModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const { uid } = useAuthUser();
  const { data, error, isLoading, refetch } = useDailyResults(uid, PID);

  const PIDToday = getPIDOnDevice();

  // -----------------------------------------------------------------------------------------------------------------------
  // on mount check to see if there is a friend request pending if so then show the modal with modal info
  useEffect(() => {
    if (data && data.FriendRequestsFlag) {
      console.log(data);
      setShowModal(true);
    }
  }, [data]);

  // -----------------------------------------------------------------------------------------------------------------------
  const handlePressPrevious = () => {
    const PIDLast = "S00220"; // Example hardcoded limit
    if (PID === PIDLast) return;
    setPID(changePIDOnDevice(PID, -1));
  };

  const handlePressNext = () => {
    if (PID === PIDToday) return;
    setPID(changePIDOnDevice(PID, 1));
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // -----------------------------------------------------------------------------------------------------------------------
  // This function is used to determine if the user has completed the daily puzzle by looking to see if the puzzle pid
  // for today has a completed result, if so pass this boolean value to daily play floating button, whiich will then instead
  // display a modal saying the puzzle is completed
  const isPuzzleCompleted = (data) => {
    if (!data) return false;
    if (!uid) return false;

    const PIDInData = data.PID;

    // first check if the page the data is on is for today
    if (PIDToday !== PIDInData) return false;

    const EncodedResultPIDToday = data.Leaderboard.find(
      (entry) => entry.UID === uid
    ).EncodedResult;

    // if it is the same then check if a result is given, if no result EncodedResult then true to display
    if (EncodedResultPIDToday === "") return true;

    // otherwise return false because a encoded result is present
    return false;
  };

  // console.log test with useEffect
  // useEffect(() => {
  //   console.log(isPuzzleCompleted(data));
  // }, [data]);

  const puzzleCompleted = isPuzzleCompleted(data);

  // -----------------------------------------------------------------------------------------------------------------------
  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <Text>Error</Text>;
  }

  // -----------------------------------------------------------------------------------------------------------------------
  return (
    <View style={styles.container}>
      <ModalGeneric
        title={"Friend Request"}
        description={
          "You have a friend request pending. Would you like to view this request?"
        }
        labelYes="Open"
        labelNo="Close"
        onYes={() => {
          // navigate to the friends page in the account stack
          navigation.navigate("AccountMainNavigation", {
            screen: "AccountFriends",
          });
        }}
        onNo={() => {
          // does nothing - just closes modal
        }}
        isVisible={showModal}
        setVisible={setShowModal}
      ></ModalGeneric>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Header title="Daily" />
        <DailyCustomInput
          title={
            data && data.Title
              ? data.Title
              : `Strands #${parseInt(PID.match(/S0*(\d+)/)[1])}`
          }
          description={data && data.Description ? data.Description : "-"}
          handlePressPrevious={handlePressPrevious}
          handlePressNext={handlePressNext}
        ></DailyCustomInput>
        <ShadowLineSeperator></ShadowLineSeperator>

        <View style={styles.listOuterContainer}>
          <DailyHeader></DailyHeader>
          {data && data.Leaderboard && (
            <FlatList
              data={data.Leaderboard}
              keyExtractor={(item) => item.UID.toString()}
              renderItem={({ item }) => <DailyItem item={item} />}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          )}
        </View>
        {/* <DailyInfoCard></DailyInfoCard> */}
      </ScrollView>
      {/* only show if pidtoday is the same as the pid in data */}
      {PIDToday === data.PID && <DailyPlay puzzleCompleted={puzzleCompleted}></DailyPlay>}
    </View>
  );
};
// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  scrollView: {
    flex: 1,
    width: "100%",
    paddingHorizontal: theme.main.paddingHorizontal,
  },

  listOuterContainer: {
    ...theme.class.ContainerCard,
  },
});
// -----------------------------------------------------------------------------------------------------------------------
export default PageDaily;
