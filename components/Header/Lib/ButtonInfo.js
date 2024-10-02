import { View, StyleSheet, TouchableOpacity } from "react-native";
import theme from "../../../data/theme.json";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import api from "../../../api/api";
import { captureException } from "@sentry/react-native";

// -----------------------------------------------------------------------------------------------------------------------
const ButtonInfo = ({ hasNewNotifications, show = true }) => {
  const navigation = useNavigation();

  const handlerNavigate = () => {
    navigation.navigate("Guide", { initialStep: 1 });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlerNavigate}>
        <MaterialCommunityIcons
          name="information-variant"
          color={show ? "white" : theme.colors.gray.T400}
          size={28}
        />
        {hasNewNotifications && <View style={styles.dot} />}
      </TouchableOpacity>
    </View>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: theme.colors.gray.T300,
    borderRadius: theme.borderRadius.md,
  },
  dot: {
    position: "absolute",
    top: -3,
    right: -3,
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: theme.colors.active,
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default ButtonInfo;
