import { TouchableOpacity, Text, View, Image, StyleSheet } from "react-native";
import theme from "../../data/theme.json";
import * as AppleAuthentication from "expo-apple-authentication";
import { OAuthProvider, signInWithCredential, getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import api from "../../api/api";

// -----------------------------------------------------------------------------------------------------------------------
const AuthButtonSocialApple = ({}) => {
  const navigation = useNavigation();

  // handler for sign-in with apple
  const signInWithApple = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      const { identityToken } = credential;
      const auth = getAuth();
      const provider = new OAuthProvider("apple.com");
      const oAuthCredential = provider.credential({
        idToken: identityToken,
      });

      const userCredential = await signInWithCredential(auth, oAuthCredential);
      const uid = userCredential.user.uid;

      // Check if the user is new by seeing if a record exists in the database
      let userExists = false;
      try {
        const response = await api.get(`/user/${uid}/status`);
        userExists = response.data.status;
        if (__DEV__) {
          console.log("User status response:", response.data);
        }
      } catch (error) {
        console.error("Error checking if user exists:", error.response || error);
        // Assume user doesn't exist if there's an error
        userExists = false;
      }

      if (!userExists) {
        if (__DEV__) {
          console.log("User doesn't exist, attempting to create...");
        }
        // This is a new user, call your API to store user details in database
        try {
          const postResponse = await api.post(`/user/${uid}`);
          if (__DEV__) {
            console.log("User creation response:", postResponse.data);
          }
        } catch (postError) {
          console.error("Error creating new user:", postError.response || postError);
          // Handle the error (e.g., show an error message to the user)
        }
      } else {
        if (__DEV__) {
          console.log("User already exists, skipping creation");
        }
      }

      // Navigate to the main screen
      navigation.navigate("Main");
    } catch (error) {
      console.error("Apple Sign-In Error:", error);
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={signInWithApple}>
      <Image source={require("../../assets/icons8-apple-48.png")} style={styles.icon} />
      <Text style={styles.text}>Continue with Apple</Text>
    </TouchableOpacity>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: theme.colors.gray.T100,
    height: 54,
    borderRadius: theme.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 0,
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 24,
  },
  text: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: theme.letterSpacing.tight,
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default AuthButtonSocialApple;
