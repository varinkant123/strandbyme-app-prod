import { useState, useEffect, useRef } from "react";
import { View, StyleSheet, AppState, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import api from "../../api/api";
import { format } from "date-fns";
import { useAuthUser } from "../../components/Auth/AuthUserContext";
import { getPIDOnDevice } from "../../utils/PID/getPIDOnDevice";
// docs
// https://github.com/react-native-webview/react-native-webview/blob/master/docs/Reference.md

// -----------------------------------------------------------------------------------------------------------------------
const PageStrands = () => {
  const navigation = useNavigation();
  const { uid } = useAuthUser();
  const [isActive, setIsActive] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [extractedText, setExtractedText] = useState();
  const appStateRef = useRef(AppState.currentState);
  const startTimeRef = useRef(new Date());
  const submissionHandledRef = useRef(false);
  const pid = getPIDOnDevice();

  // --------------------------------------------------------------
  // javscript injection to close webview when result is displayed on screen
  const injectedJavaScript = `
  (function() {
    function getFullHtml() {
      const contentElement = document.querySelector("#portal-modal-system > div");
  
      if (contentElement) {
        const fullHtml = document.documentElement.outerHTML;
  
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'html',
          pageHTML: fullHtml
        }));
      }
      setTimeout(getFullHtml, 1000); // Check every second
    }
  
    getFullHtml();
  })();
  `;

  const handleMessage = (event) => {
    try {
      const message = JSON.parse(event.nativeEvent.data);
      if (message.type === "html") {
        setExtractedText(message);
        console.log("Received HTML");
      }
    } catch (error) {
      console.error("Error parsing message:", error);
    }
  };

  // useEffect for puzzle is completed then close webview and send api request to process puzzle and update result hook
  useEffect(() => {
    if (
      extractedText &&
      extractedText.pageHTML &&
      extractedText.pageHTML.includes("NEXT PUZZLE IN")
    ) {
      console.log("'NEXT PUZZLE IN' found. Calling handleEndTime('true')");
      handleEndTime("true");
    }
  }, [extractedText]);

  // --------------------------------------------------------------
  // on mount
  useEffect(() => {
    const subscription = AppState.addEventListener("change", handleAppStateChange);
    handleStartTime();

    return () => {
      subscription.remove();
      handleEndTime();
    };
  }, []);

  // --------------------------------------------------------------
  // handlers
  const handleAppStateChange = (nextAppState) => {
    if (appStateRef.current.match(/inactive|background/) && nextAppState === "active") {
      handleStartTime();
    } else if (
      appStateRef.current === "active" &&
      nextAppState.match(/inactive|background/)
    ) {
      handleEndTime();
    }
    appStateRef.current = nextAppState;
  };

  // start
  const handleStartTime = async () => {
    setIsActive(true);
    startTimeRef.current = new Date();
    const startTime = format(startTimeRef.current, "yyyy-MM-dd HH:mm:ss SSS");
    try {
      await api.post(`/results/${uid}/${pid}/log`, {
        DateTimeStartOnDevice: startTime,
      });
      console.log("Start time logged successfully");
    } catch (error) {
      console.error("Error posting start time:", error);
    }
    setLoading(false);
  };

  // end
  // To ensure that the /results/log route is completed before the /results/submit route is run,
  // you can use await for both API calls. Here's how you can modify the handleEndTime function to achieve this:
  // This structure guarantees that when FlagClosed is true, the /results/log route will complete before the
  // /results/submit route is called. If the log route fails, the submit route won't be called at all.
  const handleEndTime = async (FlagClosed = "false") => {
    console.log("handleEndTime called with FlagClosed:", FlagClosed);

    const endTime = new Date();
    const formattedEndTime = format(endTime, "yyyy-MM-dd HH:mm:ss SSS");
    const formattedStartTime = format(startTimeRef.current, "yyyy-MM-dd HH:mm:ss SSS");

    try {
      console.log("Logging end time...");
      await api.put(`/results/${uid}/${pid}/log`, {
        DateTimeStartOnDevice: formattedStartTime,
        DateTimeEndOnDevice: formattedEndTime,
        FlagClosed: FlagClosed,
      });
      console.log("End time logged successfully");

      if (FlagClosed === "true" && !submissionHandledRef.current) {
        submissionHandledRef.current = true;
        setLoading(true);
        try {
          console.log("Checking if result is already submitted...");
          const response = await api.get(`/results/${uid}/${pid}/submit`);

          if (response.data && response.data.isSubmitted) {
            console.log("Result already submitted, skipping submission");
          } else {
            console.log("Submitting HTML, length:", extractedText.pageHTML.length);
            await api.post(`/results/${uid}/${pid}/submit`, {
              pageHTML: extractedText.pageHTML,
            });
            console.log("Submit successful");
          }
        } catch (error) {
          console.error("Error updating puzzle submit:", error);
          console.error(
            "Error details:",
            error.response ? error.response.data : error.message
          );
        } finally {
          setLoading(false);
          navigation.navigate("Daily");
        }
      }
    } catch (error) {
      console.error("Error in handleEndTime:", error);
    }

    setIsActive(false);
  };

  // --------------------------------------------------------------
  // use effect for loading
  if (isLoading) {
    return (
      <View style={styles.containerMain}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // --------------------------------------------------------------
  return (
    <View style={styles.webViewContainer}>
      <WebView
        source={{ uri: "https://www.nytimes.com/games/strands" }}
        style={styles.webView}
        onLoadEnd={() => setLoading(false)}
        injectedJavaScript={injectedJavaScript}
        onMessage={handleMessage}
        originWhitelist={["*"]}
        allowUniversalAccessFromFileURLs={true}
        allowFileAccess={true}
      />
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  webViewContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "white",
    zIndex: 1000,
    paddingBottom: 60,
  },
  webView: {
    flex: 1,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1001,
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default PageStrands;

// -----------------------------------------------------------------------------------------------------------------------
/*
  To prevent the WebView warning "Unable to open URL: about:srcdoc" on iOS, 
  add the 'about' URL scheme to LSApplicationQueriesSchemes in the iOS Info.plist.
  
  Since we're using Expo, this configuration is done in app.json or app.config.js:
  
  "expo": {
    "ios": {
      "infoPlist": {
        "LSApplicationQueriesSchemes": ["about"]
      }
    }
  }

  Note: This change requires rebuilding the project using `expo prebuild` or `eas build --platform ios`.
*/

// -----------------------------------------------------------------------------------------------------------------------
//   const injectedJavaScript = `
// (function() {
//   function printHintContent() {
//     const hintElement = document.querySelector('#hint > p');
//     if (hintElement) {
//       const content = hintElement.innerText;
//       window.ReactNativeWebView.postMessage(JSON.stringify({
//         type: 'hintContent',
//         content: content
//       }));
//     }
//   }

//   // Create a MutationObserver instance
//   const observer = new MutationObserver((mutations) => {
//     mutations.forEach((mutation) => {
//       if (mutation.type === 'childList' || mutation.type === 'characterData') {
//         printHintContent();
//       }
//     });
//   });

//   // Configuration of the observer
//   const config = {
//     childList: true,
//     characterData: true,
//     subtree: true
//   };

//   // Start observing the target node for configured mutations
//   const targetNode = document.querySelector('#hint');
//   if (targetNode) {
//     observer.observe(targetNode, config);
//   } else {
//     // If the hint element doesn't exist yet, wait for it to be added to the DOM
//     const bodyObserver = new MutationObserver((mutations) => {
//       const hintNode = document.querySelector('#hint');
//       if (hintNode) {
//         observer.observe(hintNode, config);
//         bodyObserver.disconnect(); // Stop observing the body once we've found the hint node
//       }
//     });

//     bodyObserver.observe(document.body, { childList: true, subtree: true });
//   }

//   // Initial check
//   printHintContent();
// })();
// `;

// const handleMessage = (event) => {
//   try {
//     const message = JSON.parse(event.nativeEvent.data);
//     if (message.type === "hintContent") {
//       console.log("Hint content:", message.content);
//       // You can update your component state here if needed
//       // setHintContent(message.content);
//     }
//   } catch (error) {
//     console.error("Error parsing message:", error);
//   }
// };
