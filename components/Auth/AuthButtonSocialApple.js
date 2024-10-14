import { TouchableOpacity, Text, View, Image, StyleSheet } from "react-native";
import theme from "../../data/theme.json";
import * as AppleAuthentication from "expo-apple-authentication";
import { OAuthProvider, signInWithCredential, getAuth } from "firebase/auth";
import { useAuthUser } from "../../components/Auth/AuthUserContext";

// -----------------------------------------------------------------------------------------------------------------------
const AuthButtonSocialApple = ({}) => {
  const { setIsSignedIn, setUid } = useAuthUser();

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

      // Update the auth state
      setIsSignedIn(true);
      setUid(uid);
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
