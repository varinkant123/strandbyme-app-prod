import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import theme from "../../data/theme.json";
import Spacer from "../UI/Spacer";

// -----------------------------------------------------------------------------------------------------------------------
// data
// images
const avatarImports = {
  "001": require("../../assets/avatar/001.png"),
  "002": require("../../assets/avatar/002.png"),
  "003": require("../../assets/avatar/003.png"),
  "004": require("../../assets/avatar/004.png"),
  "005": require("../../assets/avatar/005.png"),
  "006": require("../../assets/avatar/006.png"),
  "007": require("../../assets/avatar/007.png"),
  "008": require("../../assets/avatar/008.png"),
  "009": require("../../assets/avatar/009.png"),
  "010": require("../../assets/avatar/010.png"),
  "011": require("../../assets/avatar/011.png"),
  "012": require("../../assets/avatar/012.png"),
  "013": require("../../assets/avatar/013.png"),
  "014": require("../../assets/avatar/014.png"),
  "015": require("../../assets/avatar/015.png"),
  "016": require("../../assets/avatar/016.png"),
  "017": require("../../assets/avatar/017.png"),
  "018": require("../../assets/avatar/018.png"),
  "019": require("../../assets/avatar/019.png"),
  "020": require("../../assets/avatar/020.png"),
  "021": require("../../assets/avatar/021.png"),
  "022": require("../../assets/avatar/022.png"),
  "023": require("../../assets/avatar/023.png"),
  "024": require("../../assets/avatar/024.png"),
  "025": require("../../assets/avatar/025.png"),
};

// avatar options
const avatarOptions = Array.from({ length: 25 }, (_, i) =>
  String(i + 1).padStart(3, "0")
);

// colors
const colorOptions = ["#FD8A8A", "#F1F7B5", "#A8D1D1", "#9EA1D4"];

// -----------------------------------------------------------------------------------------------------------------------
const SignupScreenAvatarWithColor = ({
  defaultValue = { avatar: "001", color: theme.colors.gray.T200 },
  updateData,
}) => {
  const [backgroundColor, setBackgroundColor] = useState(theme.colors.gray.T200);
  const [selectedAvatar, setSelectedAvatar] = useState(defaultValue.avatar);

  const handleColorSelect = (color) => {
    setBackgroundColor(color);
    updateData("UserAvatar", `${selectedAvatar}${color}`);
  };

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
    updateData("UserAvatar", `${avatar}${backgroundColor}`);
  };

  // -----------------------------------------------------------------------------------------------------------------------
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.main}>
        <View style={styles.avatarContainer}>
          {avatarOptions.map((avatar) => (
            <TouchableOpacity
              key={avatar}
              style={[
                styles.avatarSquare,
                { backgroundColor: backgroundColor },
                selectedAvatar === avatar && styles.selectedSquare,
              ]}
              onPress={() => handleAvatarSelect(avatar)}
            >
              <Image source={avatarImports[avatar]} style={styles.avatarImage} />
            </TouchableOpacity>
          ))}
        </View>
        <Spacer height={20} />
        {/* <View style={styles.colorContainer}>
          {colorOptions.map((color) => (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorSquare,
                { backgroundColor: color },
                // backgroundColor === color && styles.selectedSquare,
              ]}
              onPress={() => handleColorSelect(color)}
            />
          ))}
        </View> */}
      </View>
    </ScrollView>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  main: {
    width: "100%",
  },
  colorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  colorSquare: {
    flex: 1,
    height: 40,
    marginHorizontal: "1%",
    borderRadius: theme.borderRadius.md,
  },
  avatarContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  avatarSquare: {
    width: "18%",
    aspectRatio: 1,
    marginBottom: 10,
    borderRadius: theme.borderRadius.md,
    padding: 8,
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  selectedSquare: {
    borderWidth: 3,
    borderColor: theme.colors.primary,
  },
});
// -----------------------------------------------------------------------------------------------------------------------
export default SignupScreenAvatarWithColor;
