import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import theme from "../data/theme.json";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/UI/Button";
import ButtonUnstyled from "../components/UI/ButtonUnstyled";
import SignupDataForm from "../components/Signup/SignupDataForm";
import Spacer from "../components/UI/Spacer";
import isValidInput from "../components/Signup/utils/isValidInput";
import { useAuthUser } from "../components/Auth/AuthUserContext";
import SignupScreenUserDetails from "../components/Signup/SignupScreenUserDetails";
import SignupScreenAvatar from "../components/Signup/SignupScreenAvatar";
import api from "../api/api";
import LoadingIndicator from "../components/UI/LoadingIndicator";

// -----------------------------------------------------------------------------------------------------------------------
const PageSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [data, setData] = useState(SignupDataForm());
  const { uid } = useAuthUser();
  const navigation = useNavigation();

  // ---------------------------------------------------------------------------------------------------------------------
  // modified setdata which updates the value of the input based on the id
  const updateData = (id, value) => {
    setData((prevData) =>
      prevData.map((item) => (item.id === id ? { ...item, value } : item))
    );
  };

  // function to validate input for user details
  const isValidInputForUserDetails = (data) => {
    const valid = data.every((item) => {
      if (
        item.id === "UserFirstName" ||
        item.id === "UserLastName" ||
        item.id === "UserLocationCountry"
      ) {
        return isValidInput(item.id, item.value);
      } else {
        return true;
      }
    });
    return valid;
  };

  // function to validate input for avatar
  const isValidInputForAvatar = (data) => {
    const valid = data.every((item) => {
      if (item.id === "UserAvatar") {
        return isValidInput(item.id, item.value);
      } else {
        return true;
      }
    });
    return valid;
  };

  // dismiss keyboard
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  // ---------------------------------------------------------------------------------------------------------------------
  // continue to next step in wizard
  const handleButtonContinue = () => {
    // only increment step if it is not the last step
    if (step < data.length - 1) {
      // go to next step
      setStep(step + 1);
    }
  };

  // go back a step in the wizard
  const handleButtonGoBack = () => {
    // if step is 1 then reset firstname, lastname and country to null
    if (step === 1) {
      setData((prevState) => {
        return prevState.map((item) => {
          if (
            item.id === "UserFirstName" ||
            item.id === "UserLastName" ||
            item.id === "UserLocationCountry" ||
            item.id === "UserAvatar"
          ) {
            return { ...item, value: null };
          }
          return item;
        });
      });
    }
    // only decrement step if it is not the first step
    if (step > 0) {
      setStep(step - 1);
    }
  };

  // submit user data to backend add params and also catch errors
  const handleSubmitUserData = async () => {
    setLoading(true);
    try {
      // transform data object so thatthe id is the name and value is the value and also add SignupCompleted
      const dataObject = data.reduce((acc, item) => {
        return { ...acc, [item.id]: item.value };
      }, {});

      // add SignupCompleted
      dataObject.SignupCompleted = "true";

      // use data hook to prepare object with user data
      await api.put(`/user/${uid}`, dataObject);
      // navigate to onboarding guide
      navigation.navigate("Guide");
    } catch (error) {
      // handle error
      console.error("Error submitting user data: ", error);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------------------------------------------------------------------------------------
  if (loading) {
    return <LoadingIndicator />;
  }

  // ---------------------------------------------------------------------------------------------------------------------
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard} accessible={false}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <KeyboardAvoidingView
          style={styles.containerKeyboardView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.containerMain}>
            <View style={styles.container}>
              {/* top */}
              <Text style={styles.title}>
                {step === 0 ? "Add Your Details" : "Select Your Avatar"}
              </Text>
              <Spacer height={24} />
              {/* input component */}
              {step === 0 ? (
                <SignupScreenUserDetails data={data} updateData={updateData} />
              ) : (
                <SignupScreenAvatar updateData={updateData} />
              )}
            </View>
            {/* bottom */}
          </View>
        </KeyboardAvoidingView>
        <View style={styles.buttonHideKeyboardView}>
          <Button
            title={"Continue"}
            onPress={step === 0 ? handleButtonContinue : handleSubmitUserData}
            disabled={
              step === 0
                ? !isValidInputForUserDetails(data)
                : !isValidInputForAvatar(data)
            }
            buttonStyle={{
              listOuterContainer: {
                marginBottom: 6,
              },
              marginTop: 30,
            }}
          ></Button>
          <ButtonUnstyled
            title="Go Back"
            onPress={handleButtonGoBack}
            display={step === 0 ? "hidden" : "display"}
          ></ButtonUnstyled>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  containerKeyboardView: {
    width: "100%",
    flex: 1,
    paddingTop: 60,
    paddingBottom: 60,
    paddingHorizontal: theme.main.paddingHorizontal,
    justifyContent: "space-between",
    alignItems: "center",
  },

  containerMain: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  container: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  title: {
    fontSize: theme.fontSizes.xxl,
    fontWeight: "bold",
    textAlign: "left",
    letterSpacing: theme.letterSpacing.tight,
    width: "100%",
  },

  buttonHideKeyboardView: {
    paddingHorizontal: theme.main.paddingHorizontal,
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default PageSignUp;
