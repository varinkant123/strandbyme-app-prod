import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import theme from "../../../data/theme.json";
import AccountSecondaryButtonFooter from "../../../components/Account/AccountSecondaryButtonFooter";
import isValidInput from "../../../components/Signup/utils/isValidInput";
import { useNavigation } from "@react-navigation/native";
import { useAuthUser } from "../../../components/Auth/AuthUserContext";
import api from "../../../api/api";
import SignupScreenAvatar from "../../../components/Signup/SignupScreenAvatar";

// -----------------------------------------------------------------------------------------------------------------------
const PageAccountAvatar = ({}) => {
  const navigation = useNavigation();
  const [inputAvatar, setInputAvatar] = useState();
  const [isLoading, setLoading] = useState(true);
  const { uid } = useAuthUser();

  // get user data which will then be prop drilled down to the component and screen within the stack
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await api.get(`/user/${uid}?atttributes=UserAvatar`);
        setInputAvatar(response.data.UserAvatar);
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

  // as i am reusign the signup input component i need to pass the updateData function
  // in the same way as the signupinput component even though i am not using it
  // key is the name of the attribute i am updating
  const updateData = (key, value) => {
    setInputAvatar(value);
  };

  // handler for save button
  const handleButtonSave = async () => {
    try {
      setLoading(true);
      const attributesToUpdate = {
        UserAvatar: inputAvatar,
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

  // for default value split up encoded value into a object with color and avatar
  // it is in format 001
  const defaultValue = {
    avatar: inputAvatar,
  };

  // for default value split up encoded value into a object with color and avatar
  // it is in format 001#FD8A8A - need to split the value
  // const defaultValue = {
  //   avatar: inputAvatar.split("#")[0],
  //   color: `#${inputAvatar.split("#")[1]}`,
  // };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.containerMain}>
        <View>
          <SignupScreenAvatar
            defaultValue={defaultValue}
            updateData={updateData}
          ></SignupScreenAvatar>
        </View>
        <AccountSecondaryButtonFooter
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
export default PageAccountAvatar;
