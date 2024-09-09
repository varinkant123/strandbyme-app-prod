import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import theme from "../../data/theme.json";
import Button from "../UI/Button";
import Spacer from "../UI/Spacer";

// -----------------------------------------------------------------------------------------------------------------------
const CreditsBalanceCard = ({ item, OnPressAddCredits }) => {
  return (
    <View style={styles.cardContainer}>
      <ImageBackground
        // TODO - decompress image
        // source={require("../../assets/Metallic.jpg")} // Replace with your image
        style={styles.card}
        resizeMode="cover" // or 'stretch', 'contain', 'repeat' depending on your need
      >
        <Text style={styles.balanceLabel}>Available Credits</Text>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceValue}>3</Text>
        </View>
        <View style={styles.divider} />
        <Text style={styles.description}>
          Credits are used per property valuation. You can add credits by clicking the
          button below.
        </Text>
        <Spacer height={20} />
        <TouchableOpacity style={styles.buttonAdd} onPress={OnPressAddCredits}>
          <Text style={styles.buttonAddText}>{"Add Credits"}</Text>
        </TouchableOpacity>
        {/* <Image
          source={require("../../assets/vectorly-dollar-coins.png")}
          style={styles.image}
        /> */}
      </ImageBackground>
    </View>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 8,
    overflow: "hidden", // This ensures the borderRadius is applied
  },
  card: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: "center",
    justifyContent: "center",
    position: "relative", // This will allow absolute positioning relative to the card
  },
  balanceLabel: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "left",
    width: "100%",
    letterSpacing: theme.letterSpacing.tight,
  },
  balanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  balanceValue: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "left",
    flexDirection: "row", // Align text elements in a row
    alignItems: "baseline", // Align text baselines
    width: "100%",
  },
  divider: {
    borderBottomColor: "gray",
    opacity: 0.2,
    borderBottomWidth: 1,
    width: "100%",
    marginVertical: 14,
  },
  description: {
    fontSize: 12,
    textAlign: "left",
    width: "100%",
  },
  image: {
    width: 80, // Set the width as needed
    height: 80, // Set the height as needed
    position: "absolute",
    right: 20, // Position as needed
    top: 30, // Position as needed
  },
  buttonAdd: {
    backgroundColor: "black",
    paddingVertical: 12,
    borderRadius: 12,
    width: "100%",
  },
  buttonAddText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    width: "100%",
    textAlign: "center",
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default CreditsBalanceCard;
