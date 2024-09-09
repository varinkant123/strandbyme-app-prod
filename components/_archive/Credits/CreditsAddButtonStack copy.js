import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import theme from "../../data/theme.json";

// -----------------------------------------------------------------------------------------------------------------------
// const CreditsAddButton = ({ label, amount, badge }) => {
//   // const [isSelected, setIsSelected] = useState(false);

//   return <Text>{label}</Text>;

//   // return (
//   //   <TouchableOpacity
//   //   // style={[styles.card, isSelected ? styles.cardSelected : null]}
//   //   // onPress={() => setIsSelected(!isSelected)}
//   //   >
//   //     {/* {isSelected && <Text style={styles.checkboxText}>✓</Text>} */}
//   //     <View style={styles.textContainer}>
//   //       <Text style={styles.textLabel}>{label}</Text>
//   //       {/* <Text style={styles.textAmount}>{amount}</Text> */}
//   //     </View>
//   //     {/* <Text style={styles.badge}>{badge}</Text> */}
//   //   </TouchableOpacity>
//   // );
// };

// -----------------------------------------------------------------------------------------------------------------------
const CreditsAddButtonStack = () => {
  return (
    <View style={styles.container}>
      <Text>{"1 Credit"}</Text>
      {/* <CreditsAddButton label="1 Credit" amount="$14.99" badge="0" /> */}
      {/* <CreditsAddButton label="3 Credits" amount="$27.99" badge="Save 25%" /> */}
      {/* <CreditsAddButton label="10 Credits" amount="$67.99" badge="Save 50%" /> */}
    </View>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 400,
    backgroundColor: "red",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    marginTop: 5,
  },
  cardSelected: {
    backgroundColor: "green",
  },
  checkboxText: {
    color: "white",
  },
  textContainer: {
    flex: 1,
  },
  textLabel: {
    color: "black",
    fontWeight: "bold",
    fontSize: theme.fontSizes.xl,
    letterSpacing: theme.letterSpacing.tight,
  },
  textAmount: {
    color: theme.colors.gray.T400,
    fontSize: theme.fontSizes.sm,
    letterSpacing: theme.letterSpacing.tight,
  },
  badge: {
    color: "white",
    backgroundColor: "#8b5cf6",
    fontSize: theme.fontSizes.xs,
    letterSpacing: theme.letterSpacing.tight,
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default CreditsAddButtonStack;
