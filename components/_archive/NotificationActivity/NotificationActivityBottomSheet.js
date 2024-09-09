import { useMemo } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import theme from "../../../data/theme.json";
// import CreditHistoryTransaction from "./NotificationActivityItem";
import BottomSheet from "@gorhom/bottom-sheet";
import Spacer from "../../UI/Spacer";
import NotificationActivityItem from "../../NotificationActivity/NotificationActivityItem";
import NotificationActivityEmpty from "../../NotificationActivity/NotificationActivityEmpty";

// UAT
const data = [
  {
    id: "202109098-123791Tz",
    timelabel: null,
    type: "player-request",
    title: "Requests",
    description: "Varin + 2 others have requested to join",
  },
  {
    id: "202109098-123792Tz",
    timelabel: "1h ago",
    type: "payment",
    title: "PayID transfer to Varin",
    description: "$12.00 for game at Kallang Tennis Centre",
  },
  {
    id: "202109098-123793Tz",
    timelabel: "3h ago",
    type: "game-accepted",
    title: "Varin has accepted your game",
    description: "On 25th Sep at Kallang Tennis Centre",
  },
  {
    id: "202109098-123294Tz",
    timelabel: "3h ago",
    type: "game-cancelled",
    title: "Varin has cancelled your game",
    description: "On 25th Sep at Blacktown Tennis Centre",
  },
  {
    id: "202109098-123214Tz",
    timelabel: "2d ago",
    type: "player-request-accepted",
    title: "Request acctepted",
    description: "Varin has accepted your request",
  },
];

// -----------------------------------------------------------------------------------------------------------------------
const NotificationActivityBottomSheet = ({ bottomSheetRef, onChange }) => {
  const snapPoints = useMemo(() => ["92%"], []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      borderRadius={10}
      index={-1}
      initialSnapIndex={0}
      enablePanDownToClose={true}
      onChange={onChange}
      style={styles.bottomSheet}
    >
      <View style={styles.containerMain}>
        <Text style={styles.title}>Activity</Text>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <NotificationActivityItem item={item} />}
          ListEmptyComponent={<NotificationActivityEmpty />}
        ></FlatList>
      </View>
    </BottomSheet>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  bottomSheet: {
    zIndex: 1000,
  },
  containerMain: {
    marginHorizontal: 18,
    marginTop: 24,
    marginBottom: 12,
    paddingBottom: 48,
  },

  title: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.lg,
    letterSpacing: theme.letterSpacing.tight,
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
    marginBottom: 24,
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default NotificationActivityBottomSheet;
