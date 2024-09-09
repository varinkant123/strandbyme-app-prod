import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import theme from "../../data/theme.json";

// -----------------------------------------------------------------------------------------------------------------------
const ButtonIcon = ({ onPress, iconName, buttonStyle }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
        <MaterialCommunityIcons name={iconName} size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    // borderRadius: theme.borderRadius.md,
    borderRadius: 12,
  },
});

export default ButtonIcon;

// import { TouchableOpacity, StyleSheet } from "react-native";
// import theme from "../../data/theme.json";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// // -----------------------------------------------------------------------------------------------------------------------
// const ButtonIcon = ({
//   onPress,
//   buttonStyle,
//   iconName,
//   iconSize = 20,
//   iconColor = "white",
//   iconStyle, // New prop to pass additional styles to the icon
// }) => {
//   return (
//     <TouchableOpacity onPress={onPress} style={[styles.button, buttonStyle]}>
//       <Icon name={iconName} size={iconSize} color={iconColor} style={iconStyle} />
//     </TouchableOpacity>
//   );
// };

// // -----------------------------------------------------------------------------------------------------------------------
// const styles = StyleSheet.create({
//   button: {
//     backgroundColor: theme.colors.primary,
//     padding: 12,
//     borderRadius: 50,
//     width: 40,
//     height: 40,
//     alignItems: "flex-start",
//     justifyContent: "flex-start",
//   },
// });

// // -----------------------------------------------------------------------------------------------------------------------
// export default ButtonIcon;
