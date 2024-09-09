import { View, Text, StyleSheet } from "react-native";
import theme from "../data/theme.json";

// -----------------------------------------------------------------------------------------------------------------------
const Page = () => {
  return (
    <View style={styles.containerMain}>
      <Text style={styles.title}>Welcome to MyScreen</Text>
      {/* Additional components and logic can go here */}
    </View>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  containerMain: {
    width: "100%",
    flex: 1,
    paddingHorizontal: theme.main.paddingHorizontal,
    backgroundColor: theme.colors.background,
  },
  // Additional styles can be added here
});

// -----------------------------------------------------------------------------------------------------------------------
export default Page;
