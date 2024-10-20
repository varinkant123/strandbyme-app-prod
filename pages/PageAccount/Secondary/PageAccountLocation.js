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
import SignupInputCountry from "../../../components/Signup/SignupInputCountry";

// -----------------------------------------------------------------------------------------------------------------------
const PageAccountLocation = ({}) => {
  const navigation = useNavigation();
  const [inputCountry, setInputCountry] = useState();
  const [isLoading, setLoading] = useState(true);
  const { uid } = useAuthUser();

  // get user data which will then be prop drilled down to the component and screen within the stack
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await api.get(`/user/${uid}?atttributes=UserLocationCountry`);
        setInputCountry(response.data.UserLocationCountry);
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
  const isValidLocation = isValidInput("UserLocationCountry", inputCountry);

  // as i am reusign the signup input component i need to pass the updateData function
  // in the same way as the signupinput component even though i am not using it
  // key is the name of the attribute i am updating
  const updateData = (key, value) => {
    setInputCountry(value);
  };

  // handler for save button
  const handleButtonSave = async () => {
    try {
      setLoading(true);
      const attributesToUpdate = {
        UserLocationCountry: inputCountry.trim(),
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
          <SignupInputCountry
            label="Country"
            updateData={updateData}
            defaultValue={inputCountry}
          />
        </View>
        <AccountSecondaryButtonFooter
          disabled={!isValidLocation}
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
export default PageAccountLocation;
