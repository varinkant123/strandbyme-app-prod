import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  ScrollView,
} from "react-native";
import theme from "../../../data/theme.json";
import Spacer from "../../../components/UI/Spacer";

// -----------------------------------------------------------------------------------------------------------------------
const PageAccountName = ({}) => {
  return (
    <View style={styles.containerMain}>
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.description}>
          Welcome to Strand By Me, your ultimate companion for the New York Times Strands
          puzzle!
        </Text>
        <View style={styles.seperator}></View>
        <Text style={styles.featureDescription}>
          Strand enhances your Strands puzzle experience by automatically tracking the
          time you spend solving each puzzle. Play through our web browser interface while
          we quietly log your solving times, allowing you to focus entirely on the
          challenge at hand.
        </Text>
        <View style={styles.seperator}></View>
        <Text style={styles.featureDescription}>
          But Strand is more than just a timer - it's a social platform for puzzle
          enthusiasts. Invite your friends to join the Strand community and see how your
          solving times compare. Challenge each other to improve and celebrate your
          achievements together.
        </Text>
        {/* <Text style={styles.featureDescription}>
          For the competitive solvers, Strand offers a dynamic leaderboard. Climb the
          ranks as you improve your times, check out detailed statistics, and see who
          claims the top spot among your friends. Whether you're aiming for personal
          improvement or friendly competition, Strand provides the tools to track your
          progress and celebrate your Strands solving journey.
        </Text> */}

        <Text style={styles.additionalInfo}>Made with ❤️ ☕ 🎾 by Varin</Text>
        <Text style={styles.version}>Version 1.0.0</Text>
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
  description: {
    fontSize: 18,
    // marginBottom: 24,
    lineHeight: 24,
    textAlign: "left",
    fontWeight: "600",
    letterSpacing: theme.letterSpacing.tight,
  },
  featureDescription: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 20,
    letterSpacing: theme.letterSpacing.tight,
  },
  additionalInfo: {
    fontSize: 16,
    marginTop: 24,
    marginBottom: 16,
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: theme.letterSpacing.tight,
  },
  version: {
    fontSize: 14,
    marginTop: 20,
    textAlign: "center",
    opacity: 0.5,
    letterSpacing: theme.letterSpacing.tight,
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default PageAccountName;
