import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import theme from "../../data/theme.json";

// -----------------------------------------------------------------------------------------------------------------------
const CreditsAddButton = ({
  label,
  amount,
  badge,
  creditsButtonOption,
  setCreditsButtonOption,
}) => {
  // for button setCreditsButtonOption with label
  const onPress = () => {
    setCreditsButtonOption(label);
  };

  // set selected if label matches options
  const selected = label === creditsButtonOption;

  // set if badge is present
  const badgePresent = badge !== null;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.button, selected && styles.buttonSelected]}>
        <View style={styles.columnSmall}>
          {/* Content for the first column */}
          {selected ? (
            <View style={styles.checkboxContainer}>
              <Text style={styles.checkboxText}>✓</Text>
            </View>
          ) : (
            // Else case: Render something else if not selected
            <View style={styles.uncheckedCheckboxContainer}></View>
          )}
        </View>

        <View style={styles.columnFlex}>
          <Text style={styles.textLabel}>{label}</Text>
          <Text style={styles.textAmount}>{amount}</Text>
        </View>
        <View style={styles.columnLarge}>
          {badgePresent && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: theme.colors.gray.T200,
    paddingHorizontal: 24,
    paddingVertical: 18,
    marginBottom: 15,
    height: 84,
    width: "100%",
    borderRadius: 6,
  },

  buttonSelected: {
    borderColor: "#22c55e",
    borderWidth: 2,
  },

  columnSmall: {
    width: 24,
    flexDirection: "column",
    justifyContent: "center",
  },
  columnFlex: {
    flex: 1,
    paddingLeft: 24,
  },
  columnLarge: {
    width: 70,
  },
  textLabel: {
    color: "black",
    fontWeight: "bold",
    fontSize: theme.fontSizes.md,
    letterSpacing: theme.letterSpacing.tight,
  },

  textAmount: {
    marginTop: 4,
    color: theme.colors.gray.T400,
    fontWeight: "bold",
    fontSize: theme.fontSizes.md,
    letterSpacing: theme.letterSpacing.tight,
  },

  uncheckedCheckboxContainer: {
    backgroundColor: theme.colors.gray.T200,
    height: 24,
    width: 24,
    borderRadius: 12,
  },

  checkboxContainer: {
    backgroundColor: "#22c55e",
    borderRadius: 12,
    height: 24,
    width: 24,
    justifyContent: "center",
    flexDirection: "column",
  },

  checkboxText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  badgeContainer: {
    backgroundColor: "#4f46e5",
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 2,
    // height: 24,
    // width: 24,
    // justifyContent: "center",
    // flexDirection: "column",
  },

  badgeText: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default CreditsAddButton;

// return (
//   <TouchableOpacity
//   // style={[styles.card, isSelected ? styles.cardSelected : null]}
//   // onPress={() => setIsSelected(!isSelected)}
//   >
//     {/* {isSelected && <Text style={styles.checkboxText}>✓</Text>} */}
//     <View style={styles.textContainer}>
//       <Text style={styles.textLabel}>{label}</Text>
//       {/* <Text style={styles.textAmount}>{amount}</Text> */}
//     </View>
//     {/* <Text style={styles.badge}>{badge}</Text> */}
//   </TouchableOpacity>
// );

// cardSelected: {
//   backgroundColor: "green",
// },

// textContainer: {
//   flex: 1,
// },

// badge: {
//   color: "white",
//   backgroundColor: "#8b5cf6",
//   fontSize: theme.fontSizes.xs,
//   letterSpacing: theme.letterSpacing.tight,
// },
