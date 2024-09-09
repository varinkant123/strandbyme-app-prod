import { View, Text, StyleSheet, FlatList } from "react-native";
import theme from "../../data/theme.json";
import DailyItem from "../../components/Daily/DailyItem";
import DailyHeader from "../../components/Daily/DailyHeader";

// -----------------------------------------------------------------------------------------------------------------------
const GuideImage2 = () => {
  // dummy data
  const data = [
    {
      UID: "001",
      UserFirstName: "Veronica",
      UserAvatar: "013",
      Position: "1",
      TimeTaken: "1:00",
      EncodedResult: "BBBBYBB",
    },
    {
      UID: "002",
      UserFirstName: "Varin",
      UserAvatar: "009",
      Position: "2",
      TimeTaken: "3:12",
      EncodedResult: "BBBBLYBB",
    },
    {
      UID: "003",
      UserFirstName: "Amy",
      UserAvatar: "022",
      Position: "3",
      TimeTaken: "13:40",
      EncodedResult: "BBLBLBBYB",
    },
  ];

  return (
    <View>
      <View style={styles.containerMain}>
        <DailyHeader></DailyHeader>
        <FlatList
          data={data}
          keyExtractor={(item) => item.UID.toString()}
          renderItem={({ item }) => <DailyItem item={item} />}
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

export default GuideImage2;
