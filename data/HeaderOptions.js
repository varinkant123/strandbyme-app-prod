import { Button } from "react-native";
import theme from "../data/theme.json";

// docs; https://reactnavigation.org/docs/5.x/stack-navigator/

export const fullScreenOptions = {
  headerShown: false,
};

export const secondaryScreenOptions = (
  title,
  headerShown = true,
  presentation = "modal",
  height = 80
) => ({
  headerShown: headerShown,
  title: title,
  // this gives the effect of a modal screen and minimises the screen behind it
  presentation: presentation,
  headerStyle: {
    // Specify a height in headerStyle to avoid glitches If your header's height differs from the default header height,
    // then you might notice glitches due to measurement being async. Explicitly specifying the height will avoid such glitches.
    height: height,
    borderBottomColor: theme.colors.gray.T50,
    borderBottomWidth: 1,
  },
  headerTitleStyle: {
    ...theme.class.PageSecondaryTitle,
  },
  headerLeftContainerStyle: {
    paddingHorizontal: 12,
  },
  headerRightContainerStyle: {
    paddingHorizontal: 12,
  },
  headerBackTitleVisible: false,
  headerTintColor: theme.colors.primary,
  //   headerLeft: () => (
  //     <Button
  //       onPress={() => navigation.goBack()}
  //       title="Back"
  //       color={theme.colors.primary}
  //     />
  //   ),
});

export const secondaryScreenCardOptions = (title) => ({
  headerShown: true,
  title: title,
  // this gives the effect of a modal screen and minimises the screen behind it
  presentation: "card",
  headerStyle: {
    // Specify a height in headerStyle to avoid glitches If your header's height differs from the default header height,
    // then you might notice glitches due to measurement being async. Explicitly specifying the height will avoid such glitches.
    height: 120,
    borderBottomColor: theme.colors.gray.T50,
    borderBottomWidth: 1,
  },
  headerTitleStyle: {
    ...theme.class.PageSecondaryTitle,
  },
  headerLeftContainerStyle: {
    paddingHorizontal: 12,
  },
  headerRightContainerStyle: {
    paddingHorizontal: 12,
  },
  headerBackTitleVisible: false,
  headerTintColor: theme.colors.primary,
  //   headerLeft: () => (
  //     <Button
  //       onPress={() => navigation.goBack()}
  //       title="Back"
  //       color={theme.colors.primary}
  //     />
  //   ),
});
