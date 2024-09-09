import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import theme from "../../data/theme.json";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { format, parseISO } from "date-fns";

// -----------------------------------------------------------------------------------------------------------------------
const LeaderboardCustomInput = ({ yearMonth, handlePressNext, handlePressPrevious }) => {
  // yearmonth given in format YYYYMM - need to get year and month in full format
  // Parse the ISO string to a Date object
  const yearMonthDate = parseISO(yearMonth);
  const titleYear = format(yearMonthDate, "yyyy");
  const titleMonthLong = format(yearMonthDate, "MMMM");

  return (
    <View style={styles.containerMain}>
      <TouchableOpacity style={styles.iconContainer} onPress={handlePressPrevious}>
        <MaterialCommunityIcons name="chevron-left" size={28} color={theme.colors.text} />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {titleMonthLong}
        </Text>
        <Text style={styles.description} numberOfLines={1} ellipsizeMode="tail">
          {titleYear}
        </Text>
      </View>

      <TouchableOpacity style={styles.iconContainer} onPress={handlePressNext}>
        <MaterialCommunityIcons
          name="chevron-right"
          size={28}
          color={theme.colors.text}
        />
      </TouchableOpacity>
    </View>
  );
};
// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  containerMain: {
    ...theme.class.ContainerCard,
    borderRadius: theme.borderRadius.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  iconContainer: {
    padding: 8,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: theme.fontSizes.sm,
    fontWeight: "bold",
    color: theme.colors.text,
    letterSpacing: theme.letterSpacing.normal,
    textAlign: "center",
  },
  description: {
    fontSize: theme.fontSizes.xs,
    width: "100%",
    color: theme.colors.text,
    letterSpacing: theme.letterSpacing.normal,
    fontWeight: "500",
    marginTop: 4,
    textAlign: "center",
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default LeaderboardCustomInput;
