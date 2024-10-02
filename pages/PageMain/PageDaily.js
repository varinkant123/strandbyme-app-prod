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

  // -----------------------------------------------------------------------------------------------------------------
  // on mount check to see if there is a friend request pending if so then show the modal with modal info
  useEffect(() => {
    if (data && data.FriendRequestsFlag) {
      setShowModal(true);
    }
  }, [data]);

  // -----------------------------------------------------------------------------------------------------------------------
  const handlePressPrevious = () => {
    // TODO - update to first PID
    const PIDLast = "S00203"; // Example hardcoded limit
    if (PID === PIDLast) return;
    setPID(changePIDOnDevice(PID, -1));
  };

  const handlePressNext = () => {
    const PIDToday = getPIDOnDevice();
    if (PID === PIDToday) return;
    setPID(changePIDOnDevice(PID, 1));
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
          {/* <DailyHeader></DailyHeader> */}
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
      <DailyPlay></DailyPlay>
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
