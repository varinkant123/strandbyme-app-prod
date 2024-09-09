import { View, Text, StyleSheet, FlatList } from "react-native";
import theme from "../../data/theme.json";

const dataComments = [
  {
    uid: "2190390812",
    name: "Veronica",
    comment: "This one is a little tough",
  },
  {
    uid: "2190390813",
    name: "Varin",
    comment: "I'm not sure if I can do it, but I'll give it a try!",
  },
];

// -----------------------------------------------------------------------------------------------------------------------
const DailyComments = ({ item }) => {
  return (
    <View style={styles.listOuterContainer}>
      <Text style={styles.subheader}>Reactions</Text>
      <FlatList
        data={dataComments}
        keyExtractor={(item) => item.uid.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <Text style={styles.commentUser}>{item.name}</Text>
            <Text style={styles.commentText}>{item.comment}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
    </View>
  );
};
// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  listOuterContainer: {
    ...theme.class.ContainerCard,
  },
  commentContainer: {
    width: "100%",
    marginBottom: 18,
  },
  commentUser: {
    fontSize: theme.fontSizes.sm,
    fontWeight: "700",
    marginBottom: 4,
    letterSpacing: theme.letterSpacing.normal,
  },
  commentText: {
    fontSize: theme.fontSizes.xs,
    fontWeight: "400",
    letterSpacing: theme.letterSpacing.tight,
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default DailyComments;
