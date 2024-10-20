import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Keyboard,
  TextInput,
  Alert,
} from "react-native";
import theme from "../../../data/theme.json";
import AccountSecondaryButtonFooter from "../../../components/Account/AccountSecondaryButtonFooter";
import SignupInput from "../../../components/Signup/SignupInput";
import isValidInput from "../../../components/Signup/utils/isValidInput";
import { useNavigation } from "@react-navigation/native";
import { useAuthUser } from "../../../components/Auth/AuthUserContext";
import api from "../../../api/api";
import { set } from "lodash";

// -----------------------------------------------------------------------------------------------------------------------
const PageAccountReportIssue = ({}) => {
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(false);
  const { uid } = useAuthUser();
  const [inputEmail, setInputEmail] = useState(null);
  const [inputMessage, setInputMessage] = useState(null);

  // loading screen
  if (isLoading) {
    return (
      <View style={styles.containerMain}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // validate input - check value is not null or undefined or a string with no characters i.e. just spaces
  const isValidEmail = isValidInput("GenericText", inputEmail);
  const isValidMessage = isValidInput("GenericText", inputMessage);

  // handler for save button
  const handleButtonSave = async () => {
    try {
      setLoading(true);
      const params = {
        Email: inputEmail,
        Message: inputMessage,
        UID: uid,
      };
      await api.post(`/report`, params);
      navigation.goBack();
    } catch (error) {
      console.error("Error reporting issue:", error);
      // Handle the error, maybe show an alert to the user
      Alert.alert("Error", "Failed to report issue. Please try again.");
      setLoading(false);
    }
  };

  // handler for close button
  const handleButtonClose = () => {
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.containerMain}>
        <View>
          <SignupInput
            placeholder="Email"
            value={inputEmail}
            onChangeText={(text) => setInputEmail(text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <SignupInput
            placeholder="Tell us more"
            value={inputMessage}
            onChangeText={(text) => setInputMessage(text)}
            numberOfLines={5}
            multiline={true}
          />
        </View>
        <AccountSecondaryButtonFooter
          disabled={!isValidEmail || !isValidMessage}
          handleButtonSave={handleButtonSave}
          handleButtonClose={handleButtonClose}
          buttonSaveLabel="Submit"
        ></AccountSecondaryButtonFooter>
      </View>
    </TouchableWithoutFeedback>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  containerMain: {
    ...theme.class.PageSecondaryContainer,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default PageAccountReportIssue;
