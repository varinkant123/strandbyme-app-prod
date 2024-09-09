import { useRef, useState, useCallback } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import theme from "../data/theme.json";
import Spacer from "../components/UI/Spacer";
import Button from "../components/UI/Button";
import AuthBottomSheet from "../components/Auth/AuthBottomSheet";
import GuideImage1 from "../components/Guide/GuideImage1";
import GuideImage2 from "../components/Guide/GuideImage2";

// -----------------------------------------------------------------------------------------------------------------------
const PageWelcome = ({ navigation }) => {
  // auth - reusable code snippet
  // ---------------------------------------------------------------------------------------------------------------------
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const bottomSheetRef = useRef(null);

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
  return (
    <View style={styles.containerMain}>
      <View style={styles.containerImage}>
        <GuideImage1 showTimer={false} />
      </View>
      <View style={styles.container}>
        <Spacer height={24} />
        <Text style={styles.title}>Strand By Me</Text>
        <Text style={styles.subtitle}>Complement your NYT Strands play</Text>
        <Text style={styles.subtitle}>by tracking your puzzle solve times</Text>
        <Text style={styles.subtitle}>and engage in friendly rivalry</Text>
        <View style={{ flex: 1 }} />
        {/* This will push the following View to the bottom */}
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
      </View>
      {isBottomSheetVisible && (
        <View style={styles.overlay} onTouchStart={closeBottomSheet} />
      )}
      <AuthBottomSheet
        bottomSheetRef={bottomSheetRef}
        onChange={handleBottomSheetChange}
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
    height: 350,
    backgroundColor: theme.colors.active,
    justifyContent: "flex-end",
    paddingBottom: 40,
    paddingHorizontal: 24,
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
    width: "50%",
    paddingBottom: 24, // Adjust padding to suit your design
  },

  title: {
    fontSize: theme.fontSizes.xl + 4,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: theme.letterSpacing.tight,
    marginBottom: 12,
  },

  subtitle: {
    // marginTop: 8,
    lineHeight: theme.fontSizes.md * 1.3,
    letterSpacing: theme.letterSpacing.tight,
    fontSize: theme.fontSizes.md,
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
});

// -----------------------------------------------------------------------------------------------------------------------
export default PageWelcome;
