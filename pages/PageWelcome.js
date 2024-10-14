import { useRef, useState, useCallback, useEffect } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";
import theme from "../data/theme.json";
import Spacer from "../components/UI/Spacer";
import Button from "../components/UI/Button";
import AuthBottomSheet from "../components/Auth/AuthBottomSheet";
import { useAuthUser } from "../components/Auth/AuthUserContext";
import api from "../api/api";
import { useNavigation } from "@react-navigation/native";
import LoadingIndicator from "../components/UI/LoadingIndicator";

// -----------------------------------------------------------------------------------------------------------------------
const PageWelcome = () => {
  const [loading, setLoading] = useState(false);
  const { uid, isSignedIn, loading: authLoading } = useAuthUser();
  const navigation = useNavigation();
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const bottomSheetRef = useRef(null);

  // handler for sign-in
  const handleSignIn = async () => {
    if (!uid) {
      return;
    }
    setLoading(true);
    // ---------------------------------------------------------------------------------------------------------------------
    // Check if the user is new by seeing if a record exists in the database
    let userExists = false;
    try {
      const response = await api.get(`/user/${uid}/status`);
      userExists = response.data.status;
    } catch (error) {
      console.error("Error checking if user exists:", error.response || error);
      // Assume user doesn't exist if there's an error
      userExists = false;
    }

    // ---------------------------------------------------------------------------------------------------------------------
    // create user record if user doesn't exist
    if (!userExists) {
      // This is a new user, call your API to store user details in database
      try {
        const postResponse = await api.post(`/user/${uid}`);
      } catch (postError) {
        console.error("Error creating new user:", postError.response || postError);
        // Handle the error (e.g., show an error message to the user)
      }
    }

    // ---------------------------------------------------------------------------------------------------------------------
    // Check if user status completed only if user exists which means there shouldn't be a race condition
    let userSignupCompleted = false;
    if (userExists) {
      try {
        const response = await api.get(`/user/${uid}`, {
          params: {
            attribute: "SignupCompleted",
          },
        });
        userSignupCompleted = response.data.SignupCompleted === "true";
      } catch (error) {
        console.error(
          "Error checking if user signup completed:",
          error.response || error
        );
        // Assume user doesn't exist if there's an error
        userSignupCompleted = false;
      }
    }

    // ---------------------------------------------------------------------------------------------------------------------
    // navigate based on if user exists or if sign up completed is false
    // console.log("User exists:", userExists);
    // console.log("User signup completed:", userSignupCompleted);
    // console.log("uid:", uid);

    if (userExists && userSignupCompleted) {
      navigation.navigate("Main");
    } else if (userExists && !userSignupCompleted) {
      navigation.navigate("SignUp");
    } else if (!userExists && !userSignupCompleted && uid) {
      navigation.navigate("SignUp");
    } else if (!userExists) {
      navigation.navigate("Welcome");
    }
  };

  // ---------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (isSignedIn) {
      handleSignIn();
    }
  }, [isSignedIn, uid]);

  // ---------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    const unsubscribe = navigation.addListener("state", (e) => {
      // When navigation state changes (i.e., navigation occurs), set loading to false
      setLoading(false);
    });

    return unsubscribe;
  }, [navigation]);

  // auth - reusable code snippet
  // ---------------------------------------------------------------------------------------------------------------------
  const openBottomSheet = () => {
    // throw new Error("testing for sentry");
    bottomSheetRef.current?.expand();
    setBottomSheetVisible(true);
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
    setBottomSheetVisible(false);
  };

  const handleBottomSheetChange = useCallback((index) => {
    // If index is -1, it means the bottom sheet is closed
    setBottomSheetVisible(index !== -1);
  }, []);

  // ---------------------------------------------------------------------------------------------------------------------
  if (loading) {
    return <LoadingIndicator />;
  }

  // ---------------------------------------------------------------------------------------------------------------------
  return (
    <View style={styles.containerMain}>
      <View style={styles.containerImage}>
        {
          <Image
            source={require("../assets/logo/logo-5-1024.png")}
            style={styles.image}
          />
        }
      </View>
      <View style={styles.container}>
        <Spacer height={12} />
        <Text style={styles.title}>Strand By Me</Text>
        {/* <Text style={styles.subtitle}>Complement your NYT Strands play</Text>
        <Text style={styles.subtitle}>by tracking your puzzle solve times</Text>
        <Text style={styles.subtitle}>and engage in friendly rivalry</Text> */}
        <View style={{ flex: 1 }} />
        {/* This will push the following View to the bottom */}
        {isSignedIn || authLoading ? (
          <View></View>
        ) : (
          <View style={styles.buttonContainer}>
            {/* <Button
              title="Get Started"
              buttonStyle={{ width: "100%" }}
              // this is temporary - need to change to open bottom sheet - just for development
              onPress={() => navigation.navigate("SignUp")}
            ></Button> */}
            <Button
              title="Log In"
              buttonStyle={{
                width: "100%",
                borderRadius: 32,
                // marginTop: 14,
                // backgroundColor: theme.colors.gray.T100,
              }}
              textStyle={{ fontWeight: "700" }}
              onPress={openBottomSheet}
            ></Button>
          </View>
        )}
      </View>
      {isBottomSheetVisible && (
        <View style={styles.overlay} onTouchStart={closeBottomSheet} />
      )}
      <AuthBottomSheet
        bottomSheetRef={bottomSheetRef}
        onChange={handleBottomSheetChange}
        setLoading={setLoading}
      ></AuthBottomSheet>
    </View>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  containerMain: {
    width: "100%",
    flex: 1,
    paddingBottom: 64,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },

  containerImage: {
    width: "100%",
    height: "50%",
    // backgroundColor: theme.colors.active,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 0,
    paddingHorizontal: 24,
    // backgroundColor: theme.colors.gray.T75,
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Adjust opacity here
  },

  container: {
    width: "100%",
    paddingHorizontal: theme.main.paddingHorizontal,
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },

  buttonContainer: {
    width: "60%",
    paddingBottom: 48, // Adjust padding to suit your design
  },

  title: {
    fontSize: theme.fontSizes.xl + 4,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: theme.letterSpacing.tight,
    marginBottom: 12,
    opacity: 0.3,
  },

  subtitle: {
    // marginTop: 8,
    lineHeight: theme.fontSizes.md * 1.4,
    // letterSpacing: theme.letterSpacing.tight,
    fontSize: theme.fontSizes.lg,
    opacity: 0.8,
    fontWeight: "400",
    textAlign: "center",
    width: "100%",
    // opacity: 0.5,
    // opacity: theme.colors.textSecondaryOpacity,
  },
  logo: {
    width: "100%",
    height: "60%",
    // borderRadius: 24,
    // backgroundColor: "#fafafa",
  },
  image: {
    width: 128,
    height: 128,
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default PageWelcome;
