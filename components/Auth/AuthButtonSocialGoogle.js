// import { useEffect, useCallback } from "react";
// import { TouchableOpacity, Text, View, Image, StyleSheet } from "react-native";
// import theme from "../../data/theme.json";
// import { useOAuth } from "@clerk/clerk-expo";
// import * as WebBrowser from "expo-web-browser";
// import * as Linking from "expo-linking";

// // -----------------------------------------------------------------------------------------------------------------------
// // Custom hook to warm up the browser
// const useWarmUpBrowser = () => {
//   useEffect(() => {
//     // Warm up the android browser to improve UX
//     // https://docs.expo.dev/guides/authentication/#improving-user-experience
//     WebBrowser.warmUpAsync();
//     return () => {
//       WebBrowser.coolDownAsync();
//     };
//   }, []);
// };

// WebBrowser.maybeCompleteAuthSession();

// // -----------------------------------------------------------------------------------------------------------------------
// const AuthButtonSocialGoogle = () => {
//   useWarmUpBrowser();
//   const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

//   const onPressSignIn = useCallback(async () => {
//     try {
//       const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();

//       if (createdSessionId) {
//         setActive({ session: createdSessionId });
//       } else {
//         // Use signIn or signUp for next steps such as MFA
//       }
//     } catch (err) {
//       console.error("OAuth error", err);
//     }
//   }, [startOAuthFlow]);

//   return (
//     <TouchableOpacity style={styles.button} onPress={onPressSignIn}>
//       <Image source={require("../../assets/icons8-google-48.png")} style={styles.icon} />
//       <Text style={styles.text}>Continue with Google</Text>
//     </TouchableOpacity>
//   );
// };

// // -----------------------------------------------------------------------------------------------------------------------
// const styles = StyleSheet.create({
//   button: {
//     width: "100%",
//     backgroundColor: theme.colors.gray.T100,
//     height: 54,
//     borderRadius: theme.borderRadius.md,
//     alignItems: "center",
//     justifyContent: "center",
//     flexDirection: "row",
//     paddingHorizontal: 0,
//   },
//   icon: {
//     width: 32,
//     height: 32,
//     marginRight: 24,
//   },
//   text: {
//     color: theme.colors.text,
//     fontSize: 16,
//     fontWeight: "600",
//     letterSpacing: theme.letterSpacing.tight,
//   },
// });

// // -----------------------------------------------------------------------------------------------------------------------
// export default AuthButtonSocialGoogle;
