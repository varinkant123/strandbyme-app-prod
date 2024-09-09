import { View, StyleSheet, Text } from "react-native";
import theme from "../../data/theme.json";

// -----------------------------------------------------------------------------------------------------------------------
const SearchSectionNoResults = () => {
  return (
    <View style={styles.containerMain}>
      <Text style={styles.title}>No results found</Text>
    </View>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  containerMain: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  title: {
    fontSize: theme.fontSizes.md,
    fontWeight: "700",
    color: theme.colors.text,
    opacity: theme.colors.textSecondaryOpacity,
    letterSpacing: theme.letterSpacing.tight,
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default SearchSectionNoResults;
