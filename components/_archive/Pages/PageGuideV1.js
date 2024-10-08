import { useRef, useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from "react-native";
import theme from "../../../data/theme.json";
import Spacer from "../../UI/Spacer";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { GuideStepData } from "../../Guide/GuideStepData";
import GuideImage1 from "../../Guide/GuideImage1";
import GuideImage2 from "../../Guide/GuideImage2";
import GuideImage3 from "../../Guide/GuideImage3";
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
        {step === 1 && <GuideImage1 showTimer={true} />}
        {step === 2 && <GuideImage2 />}
        {step === 3 && <GuideImage3 />}
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
    backgroundColor: "#fafafa",
    width: "100%",
    flex: 1,
  },

  containerMain: {
    width: "100%",
    flex: 1,
    paddingTop: 12,
    paddingBottom: 64,
    paddingHorizontal: theme.main.paddingHorizontal,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },

  containerImage: {
    width: "100%",
    height: "50%",
    backgroundColor: theme.colors.active,
    justifyContent: "flex-end",
    paddingBottom: 40,
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
    width: "100%",
    marginTop: 12,
    fontSize: theme.fontSizes.md,
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
});

// -----------------------------------------------------------------------------------------------------------------------
export default PageGuide;
