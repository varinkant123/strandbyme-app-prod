import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import theme from "../../data/theme.json";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// -----------------------------------------------------------------------------------------------------------------------
const SearchInput = ({ searchValue, setSearchValue }) => {
  const handleClear = () => {
    setSearchValue(null);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.containerMain}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Search"
          value={searchValue}
          onChangeText={(text) => setSearchValue(text)}
          style={styles.input}
        />
        {searchValue && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <MaterialCommunityIcons name="close" size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  containerMain: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: theme.colors.gray.T50,
    borderRadius: theme.borderRadius.md,
  },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: 10,
    fontSize: 16,
    color: theme.colors.text,
    fontWeight: "600",
  },
  clearButton: {
    padding: 10,
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default SearchInput;
