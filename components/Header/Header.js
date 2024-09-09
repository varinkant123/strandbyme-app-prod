import { View, StyleSheet, Text } from "react-native";
import theme from "../../data/theme.json";
import ButtonInfo from "./Lib/ButtonInfo";
import ButtonAdd from "./Lib/ButtonAdd";

// -----------------------------------------------------------------------------------------------------------------------
const Header = ({ title }) => {
  return (
    <View style={styles.main}>
      <View style={styles.containerButtons}>
        <ButtonInfo hasNewNotifications={false} show={false}></ButtonInfo>
        <Text style={styles.title}>{title}</Text>
        <ButtonAdd hasNewNotifications={false} show={true}></ButtonAdd>
      </View>
    </View>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  main: {
    marginTop: 16,
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: theme.fontSizes.xl,
    fontWeight: "bold",
    letterSpacing: theme.letterSpacing.tightextra,
    flex: 1,
    textAlign: "center",
  },
  containerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default Header;
