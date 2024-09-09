import { View, StyleSheet, Text } from "react-native";
import theme from "../../data/theme.json";
import AccountMainMenuItem from "./AccountMainMenuItem";

// -----------------------------------------------------------------------------------------------------------------------
// notes
// this is a component that is used to display a section of the main menu including a header and a list of items
// mapped to the AccountMainMenuItem component

// -----------------------------------------------------------------------------------------------------------------------
const AccountMainMenuSection = ({ item }) => {
  return (
    <View style={styles.containerMain}>
      {/* <Text style={styles.header}>{item.title}</Text> */}
      <View style={styles.containerItems}>
        {item.items.map((menuItem, index) => (
          <AccountMainMenuItem
            item={menuItem}
            key={menuItem.id}
            isLastItem={index === item.items.length - 1}
          />
        ))}
      </View>
    </View>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  containerMain: {
    ...theme.class.ContainerCard,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 6,
  },
  containerItems: {},
  header: {
    fontSize: theme.fontSizes.xs,
    fontWeight: "600",
    color: theme.colors.text,
    letterSpacing: theme.letterSpacing.tight,
    textAlign: "left",
    marginBottom: theme.spacing.sm,
    opacity: theme.colors.textSecondaryOpacity - 0.1,
    width: "100%",
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default AccountMainMenuSection;
