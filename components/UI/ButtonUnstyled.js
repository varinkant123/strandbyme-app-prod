import { Text, TouchableOpacity, StyleSheet } from "react-native";
import theme from "../../data/theme.json";

// -----------------------------------------------------------------------------------------------------------------------
const ButtonUnstyled = ({
  title,
  onPress,
  buttonStyle,
  fontSize = 16,
  fullWidth = true,
  display = "display",
}) => {
  // display:
  // hidden will return the same button but in white text with no action, this is useful to keep things in place
  // none will hide it all together
  if (display === "hidden") {
    return (
      <TouchableOpacity
        // onPress={onPress}
        style={[
          styles.button,
          buttonStyle,
          fullWidth ? styles.fullWidth : styles.fitContent,
        ]}
      >
        <Text style={[styles.buttonText, { fontSize, color: "white" }]}>{title}</Text>
      </TouchableOpacity>
    );
  } else if (display === "none") {
    return null;
  } else {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.button,
          buttonStyle,
          fullWidth ? styles.fullWidth : styles.fitContent,
        ]}
      >
        <Text style={[styles.buttonText, { fontSize }]}>{title}</Text>
      </TouchableOpacity>
    );
  }
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  fullWidth: {
    width: "100%", // Full width
  },
  fitContent: {
    width: "auto", // Fit content
  },
  buttonText: {
    color: theme.colors.text,
    letterSpacing: theme.letterSpacing.dense,
    // fontWeight: 600,
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default ButtonUnstyled;
