import { View, StyleSheet, Text, TextInput } from "react-native";
import theme from "../../data/theme.json";

// -----------------------------------------------------------------------------------------------------------------------
const Component = ({ searchValue, setSearchValue }) => {
  return (
    <View style={styles.containerMain}>
      <TextInput
        style={styles.input}
        placeholder="Find a player"
        value={searchValue}
        onChangeText={(text) => setSearchValue(text)}
      />
    </View>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  containerMain: {
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: theme.fontSizes.xl,
    fontWeight: "bold",
    color: theme.colors.text,
    letterSpacing: theme.letterSpacing.tight,
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default Component;
