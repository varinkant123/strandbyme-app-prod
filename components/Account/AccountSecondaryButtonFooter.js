import { View, StyleSheet, Text } from "react-native";
import theme from "../../data/theme.json";
import Button from "../UI/Button";
import ButtonUnstyled from "../UI/ButtonUnstyled";

// -----------------------------------------------------------------------------------------------------------------------
const AccountSecondaryButtonFooter = ({
  disabled,
  handleButtonSave,
  handleButtonClose,
  displayButtonSave = true,
  buttonSaveLabel = "Save",
}) => {
  return (
    <View style={styles.containerMain}>
      {displayButtonSave && (
        <Button
          title={buttonSaveLabel}
          onPress={handleButtonSave}
          disabled={disabled}
          buttonStyle={{
            marginBottom: 12,
            marginTop: 30,
            backgroundColor: theme.colors.primary,
          }}
        ></Button>
      )}
      <ButtonUnstyled
        title="Close"
        onPress={handleButtonClose}
        // display={(step === 0) | (pageType === "information") ? "hidden" : "display"}
      ></ButtonUnstyled>
    </View>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  containerMain: {
    alignItems: "center",
    justifyContent: "center",
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default AccountSecondaryButtonFooter;
