import { useRef, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Image,
} from "react-native";
import theme from "../data/theme.json";
import Spacer from "../components/UI/Spacer";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { GuideStepData } from "../components/Guide/GuideStepData";
import { useNavigation, useRoute } from "@react-navigation/native";

// -----------------------------------------------------------------------------------------------------------------------
const PageGuide = () => {
  const navigation = useNavigation();
  const route = useRoute();
  // step
  const initialStep = route.params?.initialStep || 1;
  const [step, setStep] = useState(initialStep);

  // Animated values
  const [fadeAnim] = useState(new Animated.Value(1));
  const [slideAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(1));

  const animateTransition = (nextStep) => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -50,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setStep(nextStep);
      slideAnim.setValue(50);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const handleNextStep = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // when at last step, navigate to Daily
    if (step === 3) {
      navigation.navigate("Main");
    } else {
      animateTransition(step + 1);
    }
  };

  // ---------------------------------------------------------------------------------------------------------------------

  return (
    <View style={styles.containerRoot}>
      <Animated.View
        style={[
          styles.containerImage,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {step === 1 && (
          <Image source={require("../assets/illustration/B3.png")} style={styles.image} />
        )}
        {step === 2 && (
          <Image source={require("../assets/illustration/B1.png")} style={styles.image} />
        )}
        {step === 3 && (
          <Image source={require("../assets/illustration/B4.png")} style={styles.image} />
        )}
      </Animated.View>
      <View style={styles.containerMain}>
        <Animated.View
          style={[
            styles.containerText,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Spacer height={40} />
          <Text style={styles.title}>{GuideStepData[step - 1].title}</Text>
          <Text style={styles.subtitle}>{GuideStepData[step - 1].subtitle}</Text>
        </Animated.View>
        <TouchableOpacity onPress={handleNextStep}>
          <Animated.View
            style={[
              styles.button,
              {
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            <MaterialCommunityIcons name="arrow-right" size={36} color="white" />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  containerRoot: {
    backgroundColor: "#fff",
    width: "100%",
    flex: 1,
  },

  containerMain: {
    width: "100%",
    flex: 1,
    paddingTop: 0,
    paddingBottom: 64,
    paddingHorizontal: theme.main.paddingHorizontal,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },

  containerImage: {
    width: "100%",
    height: "50%",
    // backgroundColor: "#fafafa",
    justifyContent: "flex-end",
    paddingBottom: 0,
    paddingHorizontal: 24,
  },

  containerText: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },

  title: {
    fontSize: theme.fontSizes.xl + 4,
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
    letterSpacing: theme.letterSpacing.tight,
  },

  subtitle: {
    width: "90%",
    marginTop: 8,
    fontSize: theme.fontSizes.md,
    lineHeight: theme.fontSizes.md * 1.3,
    marginLeft: 0,
    fontWeight: "400",
    textAlign: "center",
  },

  button: {
    backgroundColor: theme.colors.active,
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: "100%",
    height: "55%",
    resizeMode: "contain",
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default PageGuide;
