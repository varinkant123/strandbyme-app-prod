import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Keyboard,
  Alert,
} from "react-native";
import theme from "../../../data/theme.json";
import AccountSecondaryButtonFooter from "../../../components/Account/AccountSecondaryButtonFooter";
import SignupInput from "../../../components/Signup/SignupInput";
import isValidInput from "../../../components/Signup/utils/isValidInput";
import { useNavigation } from "@react-navigation/native";
import { useAuthUser } from "../../../components/Auth/AuthUserContext";
import api from "../../../api/api";

// -----------------------------------------------------------------------------------------------------------------------
const PageAccountName = ({}) => {
  const navigation = useNavigation();
  const [inputFirstNameValue, setFirstNameValue] = useState();
  const [inputLastNameValue, setLastNameValue] = useState();
  const [isLoading, setLoading] = useState(true);
  const { uid } = useAuthUser();

  // get user data which will then be prop drilled down to the component and screen within the stack
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await api.get(
          `/user/${uid}?atttributes=UserFirstName,UserLastName`
        );
        setFirstNameValue(response.data.UserFirstName);
        setLastNameValue(response.data.UserLastName);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getUserData();
  }, [uid]);

  // loading screen
  if (isLoading) {
    return (
      <View style={styles.containerMain}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // validate input
  const isValidFirst = isValidInput("UserFirstName", inputFirstNameValue);
  const isValidLast = isValidInput("UserLastName", inputLastNameValue);

  // handler for save button
  const handleButtonSave = async () => {
    try {
      setLoading(true);
      const attributesToUpdate = {
        UserFirstName: inputFirstNameValue.trim(),
        UserLastName: inputLastNameValue.trim(),
      };
      await api.put(`/user/${uid}`, attributesToUpdate);
      navigation.goBack();
    } catch (error) {
      console.error("Error updating user data:", error);
      // Handle the error, maybe show an alert to the user
      Alert.alert("Error", "Failed to update user data. Please try again.");
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
            placeholder="First Name"
            value={inputFirstNameValue}
            onChangeText={(text) => setFirstNameValue(text)}
          ></SignupInput>
          <SignupInput
            placeholder="Last Name"
            value={inputLastNameValue}
            onChangeText={(text) => setLastNameValue(text)}
          ></SignupInput>
        </View>
        <AccountSecondaryButtonFooter
          disabled={!isValidFirst || !isValidLast}
          handleButtonSave={handleButtonSave}
          handleButtonClose={handleButtonClose}
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
export default PageAccountName;
