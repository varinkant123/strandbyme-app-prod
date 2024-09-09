import {
  View,
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import theme from "../../data/theme.json";

// -----------------------------------------------------------------------------------------------------------------------
const ModalAlertGeneric = ({ isVisible, setVisible, title, description, onClose }) => {
  // --------------------------------------------------------------
  // handlers
  const handleYes = () => {
    onYes();
    setVisible(false);
  };

  const handleNo = () => {
    onNo();
    setVisible(false);
  };

  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };
  // --------------------------------------------------------------
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={handleNo}
    >
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle} accessibilityRole="header">
                {title}
              </Text>
            </View>
            <View style={styles.modalBody}>
              <Text style={styles.modalDescription}>{description}</Text>
            </View>
            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.modalFooterButtonContainer}
                onPress={handleClose}
                accessibilityRole="button"
                accessibilityLabel={"Close"}
              >
                <Text style={styles.modalFooterButton}>{"Close"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.125)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "75%",
    minHeight: 170,
    overflow: "hidden",
    flexDirection: "column",
  },
  modalHeader: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 8,
    alignItems: "center",
  },
  modalTitle: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.sm,
    letterSpacing: theme.letterSpacing.tight,
    fontWeight: "bold",
  },
  modalBody: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: theme.colors.gray.T100,
  },
  modalDescription: {
    color: theme.colors.text,
    fontSize: theme.fontSizes.xs,
    letterSpacing: theme.letterSpacing.tight,
    textAlign: "center",
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  modalFooterButtonContainer: {
    padding: 10,
    width: "100%",
  },
  modalFooterButton: {
    color: theme.colors.danger,
    fontSize: theme.fontSizes.xs,
    letterSpacing: theme.letterSpacing.tight,
    fontWeight: "bold",
    textAlign: "center",
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default ModalAlertGeneric;
