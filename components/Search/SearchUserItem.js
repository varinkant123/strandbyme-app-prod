import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import theme from "../../data/theme.json";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ImageAvatarMap from "../../data/ImageAvatar";

// -----------------------------------------------------------------------------------------------------------------------
const SearchUserItem = ({ item, onPress }) => {
  return (
    <View style={styles.containerMain}>
      <View style={styles.containerImageHeader}>
        <View style={styles.containerImage}>
          <Image style={styles.image} source={ImageAvatarMap[item.UserAvatar]} />
        </View>
      </View>
      <View style={styles.containerResult}>
        <View style={styles.containerResultHeader}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {`${item.UserFirstName} ${item.UserLastName}`}
          </Text>
          <Text style={styles.subtitle} numberOfLines={1} ellipsizeMode="tail">
            {item.UserLocationCountry}
          </Text>
        </View>
        <TouchableOpacity onPress={() => onPress(item)}>
          <View style={styles.containerButton}>
            <MaterialCommunityIcons name="plus" size={20} color={"#ffffff"} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  containerMain: {
    ...theme.class.ContainerCardItem,
    // ...theme.class.ContainerCard,
    marginBottom: 0,
    marginTop: 8,
    paddingVertical: 12,

    paddingHorizontal: 24,
    // paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f9fafb",
    // marginBottom: 8,
    width: "100%",
  },
  containerImageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerImage: {
    position: "relative",
    backgroundColor: theme.colors.gray.T200,
    borderRadius: theme.borderRadius.md,
    padding: 4,
  },
  containerButton: {
    alignSelf: "center",
    backgroundColor: theme.colors.active,
    borderRadius: theme.borderRadius.md,
    padding: 4,
  },
  image: {
    height: 24,
    width: 24,
  },
  containerResult: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    paddingLeft: 12,
    overflow: "hidden",
  },
  containerResultHeader: {
    flexDirection: "column",
  },
  containerResultStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  title: {
    fontSize: theme.fontSizes.xs,
    fontWeight: "600",
    color: theme.colors.text,
    letterSpacing: theme.letterSpacing.normal,
  },
  subtitle: {
    fontSize: theme.fontSizes.xs,
    fontWeight: "600",
    opacity: 0.4,
    letterSpacing: theme.letterSpacing.normal,
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default SearchUserItem;
