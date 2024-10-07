import { Text, TouchableOpacity, StyleSheet } from "react-native";
import theme from "../../data/theme.json";

// -----------------------------------------------------------------------------------------------------------------------
const Button = ({
  title,
  onPress,
  buttonStyle,
  textStyle,
  fontSize = 18,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      onPress={!disabled ? onPress : null}
      style={[styles.button, buttonStyle, disabled && styles.buttonDisabled]}
      activeOpacity={disabled ? 1 : 0.7}
    >
      <Text
        style={[
          styles.buttonText,
          textStyle,
          { fontSize },
          disabled && styles.buttonTextDisabled,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: "black",
    paddingVertical: 14,
    borderRadius: theme.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  buttonDisabled: {
    backgroundColor: theme.colors.gray.T200,
  },
  buttonTextDisabled: {
    color: theme.colors.gray.T300,
  },
  // Additional styles can be added here
});

// -----------------------------------------------------------------------------------------------------------------------
export default Button;
