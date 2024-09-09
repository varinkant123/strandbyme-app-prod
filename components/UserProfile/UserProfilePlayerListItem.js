import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import theme from "../../data/theme.json";

// -----------------------------------------------------------------------------------------------------------------------
const UserProfilePlayerListItem = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("UserProfile", { PID: "2190390812" });
      }}
    >
      <View style={styles.containerMain}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  containerMain: {
    alignItems: "center",
    marginRight: 16,
  },
  image: {
    width: theme.imageSizes.md,
    height: theme.imageSizes.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: 8,
  },
  name: {
    fontSize: theme.fontSizes.xxs,
    color: theme.colors.text,
    opacity: theme.colors.textSecondaryOpacity,
    textAlign: "center",
    fontWeight: "600",
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default UserProfilePlayerListItem;
