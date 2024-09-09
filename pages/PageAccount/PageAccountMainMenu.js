import { View, StyleSheet, ScrollView } from "react-native";
import theme from "../../data/theme.json";
import DataAccountMainMenu from "../../data/DataAccountMainMenu";
import AccountMainMenuSection from "../../components/Account/AccountMainMenuSection";
import Header from "../../components/Header/Header";

// -----------------------------------------------------------------------------------------------------------------------
// static
const data = DataAccountMainMenu();

// -----------------------------------------------------------------------------------------------------------------------
const PageAccountMainMenu = ({ route }) => {
  return (
    <View style={styles.containerMain}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.containerMainScrollView}
      >
        <Header title="Settings" />
        {data.map((item, index) => {
          return (
            <AccountMainMenuSection item={item} key={index}></AccountMainMenuSection>
          );
        })}
      </ScrollView>
    </View>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  containerMain: {
    width: "100%",
    backgroundColor: theme.colors.background,
  },
  containerMainScrollView: {
    width: "100%",
    height: "100%",
    paddingHorizontal: theme.main.paddingHorizontal,
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default PageAccountMainMenu;
