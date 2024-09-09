import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import theme from "../../../data/theme.json";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ImageAvatarMap from "../../../data/ImageAvatar";

// -----------------------------------------------------------------------------------------------------------------------
const AccountFriendsUserItem = ({
  item,
  index,
  handlePressRemove,
  handlePressAccept,
}) => {
  // onPress will update hooks which will launch a modal to confirm if the user wants to remove the friend.
  // if yes a onPress on that modal will remove the friend and update the friends list and update the main data hook.

  // conditional style if item.status is confirmed then opacity of 0.5 else opacity of 1
  // conditional style if is the last item with a status of

  // item.Status

  // if there is a status of non-confirmed then display a border top on the first confirmed, this is determined by the index
  // as the order shows the pending/waiting status first

  return (
    <View>
      <View
        style={[
          styles.containerMain,
          item.Status === "Waiting" || item.Status === "Pending"
            ? {
                backgroundColor: theme.colors.gray.T100,
                borderRadius: theme.borderRadius.md,
              }
            : {},
        ]}
      >
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
          <View style={styles.containerActionButtons}>
            {/* only display for pending wher euser can accept  */}
            {item.Status === "Pending" && (
              <TouchableOpacity onPress={() => handlePressAccept(item)}>
                <View style={styles.containerButtonSuccess}>
                  <MaterialCommunityIcons name="check" size={20} color={"#fff"} />
                </View>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => handlePressRemove(item)}>
              <View style={styles.containerButtonDanger}>
                <MaterialCommunityIcons name="minus" size={20} color={"#fff"} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
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
    paddingVertical: 14,

    paddingHorizontal: 8,
    // paddingVertical: 16,
    // borderRadius: 8,
    // backgroundColor: "#fff",
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.05,
    // shadowRadius: 8,
    // elevation: 3,
    // borderWidth: 1,
    // borderColor: "#f9fafb",
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
  containerActionButtons: {
    flexDirection: "row",
  },
  containerButtonDanger: {
    alignSelf: "center",
    backgroundColor: theme.colors.danger,
    borderRadius: theme.borderRadius.md,
    padding: 4,
  },
  containerButtonSuccess: {
    alignSelf: "center",
    backgroundColor: theme.colors.success,
    borderRadius: theme.borderRadius.md,
    padding: 4,
    marginRight: 12,
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
export default AccountFriendsUserItem;
