import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  ScrollView,
} from "react-native";
import theme from "../../../data/theme.json";
import AccountSecondaryButtonFooter from "../../../components/Account/AccountSecondaryButtonFooter";
import Spacer from "../../../components/UI/Spacer";

// -----------------------------------------------------------------------------------------------------------------------
const PageAccountFAQs = ({}) => {
  return (
    <View style={styles.containerMain}>
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.question}>Should I login to my NYT account</Text>
        <Text style={styles.answer}>
          NYT login isn't necessary to play. Strands is free for everyone, and we save all
          your puzzle-solving achievements to your Stand By Me account.
        </Text>
        <View style={styles.seperator}></View>
        <Text style={styles.question}>How does the app measure solving time</Text>
        <Text style={styles.answer}>
          Solving time is measured from the moment you start the puzzle until you finish
          it. The app stores these timestamps to determine your total time.
        </Text>
        <View style={styles.seperator}></View>

        <Text style={styles.question}>
          How do I pause the timer when I'm not solving the puzzle
        </Text>
        <Text style={styles.answer}>
          There's no need to manually pause the timer. The app intelligently detects
          inactivity, allowing you to close it, run it in the background, or navigate away
          without affecting your solving time
        </Text>
        <View style={styles.seperator}></View>

        <Text style={styles.question}>How is the leaderboard ranking calculated</Text>
        <Text style={styles.answer}>
          Rankings are determined first by fewest hints used, then by fastest solving
          time.
        </Text>
        <View style={styles.seperator}></View>

        <Text style={styles.question}>Can I share my results with friends</Text>
        <Text style={styles.answer}>
          We don't have a direct sharing feature yet, but you can add friends in the app
          to compete and compare results.
        </Text>

        <View style={styles.seperator}></View>

        <Text style={styles.question}>Why does my puzzle completion time look wrong</Text>
        <Text style={styles.answer}>
          Report the problem along with your Strands ID. We'll look into it and try to fix
          the issue.
        </Text>
        <View style={styles.seperator}></View>

        <Spacer height={40} />
      </ScrollView>
    </View>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    paddingBottom: 40,
    backgroundColor: "#fff",
  },

  contentContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 32,
    paddingTop: 24,
    paddingBottom: 160, // Add extra padding at the bottom for better scrolling
  },
  question: {
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 6,
    textAlign: "left",
    fontWeight: "600",
    letterSpacing: theme.letterSpacing.tight,
  },
  answer: {
    fontSize: 16,
    marginBottom: 18,
    lineHeight: 20,
    letterSpacing: theme.letterSpacing.tight,
    textAlign: "left",
  },
  seperator: {
    width: "100%",
    height: 1,
    // backgroundColor: theme.colors.gray.T100,
    marginBottom: 18,
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default PageAccountFAQs;
