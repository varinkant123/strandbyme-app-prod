import { View, StyleSheet } from "react-native";
import theme from "../../data/theme.json";

// -----------------------------------------------------------------------------------------------------------------------
const ShadowLineSeperator = ({}) => {
  return (
    <View style={styles.lineSeparatorContainer}>
      <View style={styles.lineSeparator} />
    </View>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  lineSeparatorContainer: {
    width: "100%",
    height: 15,
    marginVertical: 4,
    backgroundColor: "transparent",
    // backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  lineSeparator: {
    width: "100%",
    opacity: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default ShadowLineSeperator;
