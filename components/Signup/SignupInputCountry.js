import React, { useState, useEffect, useMemo } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import theme from "../../data/theme.json";
import Spacer from "../UI/Spacer";
import DataCountryEmoji from "../../data/DataCountryEmoji";
import { parseCountryInput } from "./utils/parseCountryInput";

// -----------------------------------------------------------------------------------------------------------------------
// Notes
// Keep styling and functionatliy in alignment with SignupInput

// -----------------------------------------------------------------------------------------------------------------------
// Data
const countries = DataCountryEmoji();

const SignupInputCountry = ({
  updateData,
  label,
  defaultValue = "",
  ...textInputProps
}) => {
  const [query, setQuery] = useState(defaultValue);
  const [selectedCountry, setSelectedCountry] = useState(null);

  // update hook with selected country
  useEffect(() => {
    if (query) {
      updateData("UserLocationCountry", parseCountryInput(query));
    }
  }, [query]);

  // ---------------------------------------------------------------------------------------------------------------------
  // functions
  const handleInputChange = (text) => {
    setQuery(text);
  };

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setQuery(`${country.name}`);
    Keyboard.dismiss();
  };

  const filterCountries = (text) => {
    if (text === "") {
      return [];
    } else if (text.length < 3) {
      return [];
      // if an exact value is found return a empty array as a match is found and suggestions are not needed
    } else if (
      countries.find((country) => country.name.toLowerCase() === text.toLowerCase())
    ) {
      return [];
    }

    return countries
      .filter((country) => country.name.toLowerCase().includes(text.toLowerCase()))
      .slice(0, 3);
  };

  // Use useMemo to memoize the filtered countries
  const matchedCountries = useMemo(() => filterCountries(query), [query]);

  // ---------------------------------------------------------------------------------------------------------------------
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Spacer height={0} />
      <TextInput
        selectionColor={theme.colors.primary}
        spellCheck={false}
        autoCorrect={false}
        style={[styles.input]}
        value={query}
        onChangeText={handleInputChange}
        {...textInputProps}
      />
      {matchedCountries.length > 0 && (
        <FlatList
          data={matchedCountries}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelectCountry(item)}
              style={styles.suggestion}
            >
              <Text style={styles.suggestionText}>
                {item.flag} {` ${item.name}`}
              </Text>
            </TouchableOpacity>
          )}
          // Add a key prop to force re-render when query changes
          key={query}
          keyboardShouldPersistTaps="always"
        />
      )}
    </View>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    fontSize: theme.fontSizes.xs,
    color: theme.colors.gray.T400,
    letterSpacing: theme.letterSpacing.tight,
  },
  input: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderColor: theme.colors.gray.T300,
    borderBottomWidth: 1,
    marginBottom: 24,
    fontSize: theme.fontSizes.lg,
    fontWeight: "500",
    paddingTop: 4,
    paddingBottom: 8,
  },
  suggestion: {
    paddingVertical: 8,
    marginBottom: 10,
    width: "100%",
    backgroundColor: theme.colors.gray.T100,
    borderRadius: theme.borderRadius.md,
  },
  suggestionText: {
    textAlign: "center",
    fontSize: theme.fontSizes.md,
    fontWeight: "500",
    // color: theme.colors.gray.T400,
    letterSpacing: theme.letterSpacing.tight,
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default SignupInputCountry;
