import { TouchableOpacity, Text, View, Image, StyleSheet } from "react-native";
import theme from "../../data/theme.json";

// -----------------------------------------------------------------------------------------------------------------------
const AuthLineSeperator = ({ text }) => {
  return (
    <View style={styles.separatorContainer}>
      <View style={styles.separator} />
      <Text style={styles.separatorText}>{text}</Text>
      <View style={styles.separator} />
    </View>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.gray.T200,
  },
  separatorText: {
    marginHorizontal: 10,
    color: theme.colors.text,
    opacity: theme.colors.textSecondaryOpacity,
    fontSize: 14,
    // fontWeight: "600",
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default AuthLineSeperator;
