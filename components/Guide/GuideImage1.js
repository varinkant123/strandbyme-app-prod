import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import theme from "../../data/theme.json";
import CommunityMaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";

// -----------------------------------------------------------------------------------------------------------------------
const CirclesAndLines = () => {
  const circles = 7; // 7 circles per row

  return (
    <View style={styles.circlesContainer}>
      <View style={styles.row}>
        {[...Array(circles)].map((_, i) => (
          <React.Fragment key={`top-${i}`}>
            <View style={[styles.circle, styles.blueCircle]} />
            {i < circles - 1 && <View style={[styles.line, styles.blueLine]} />}
          </React.Fragment>
        ))}
      </View>
      <View style={styles.row}>
        {[...Array(circles)].map((_, i) => (
          <React.Fragment key={`bottom-${i}`}>
            <View style={[styles.circle, styles.yellowCircle]} />
            {i < circles - 1 && <View style={[styles.line, styles.yellowLine]} />}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const GuideImage1 = (showTimer = true) => {
  const [seconds, setSeconds] = useState(0);

  const formatTime = useCallback((totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View>
      {showTimer === true && (
        <View style={styles.containerTimer}>
          <Text style={styles.textTimer}>{formatTime(seconds)}</Text>
        </View>
      )}
      <View style={styles.containerMain}>
        <View style={styles.containerNavbar}>
          <CommunityMaterialIcons
            name="chevron-left"
            size={26}
            color={theme.colors.gray.T400}
          />
          <Text style={styles.textNavbarHeader}>Strands</Text>
          <CommunityMaterialIcons name="menu" size={18} color={theme.colors.gray.T400} />
        </View>
        <View style={styles.contentContainer}>
          <CirclesAndLines />
        </View>
      </View>
    </View>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  containerMain: {
    height: 160,
    backgroundColor: "#fff",
    borderRadius: theme.borderRadius.md,
    overflow: "hidden",
  },
  containerTimer: {
    height: 48,
    backgroundColor: "#115e59",
    borderRadius: theme.borderRadius.md,
    marginBottom: 18,
    flexDirection: "column",
    justifyContent: "center",
  },
  textTimer: {
    color: "#fff",
    fontSize: theme.fontSizes.lg,
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
  },
  circlesContainer: {
    width: "100%",
    justifyContent: "flex-end",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  blueCircle: {
    backgroundColor: "#7dd3fc",
  },
  yellowCircle: {
    backgroundColor: "#fcd34d",
  },
  line: {
    height: 2,
    width: 20,
    marginHorizontal: -2,
  },
  blueLine: {
    backgroundColor: "#7dd3fc",
  },
  yellowLine: {
    backgroundColor: "#fcd34d",
  },
  containerNavbar: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray.T300,
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
  },
  textNavbarHeader: {
    color: theme.colors.gray.T400,
    fontSize: theme.fontSizes.xs,
    fontWeight: "bold",
    textAlign: "center",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
});

export default GuideImage1;
