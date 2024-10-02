import React, { useState, useCallback } from "react";
import { TouchableOpacity, Text, View, StyleSheet, TextInput } from "react-native";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import theme from "../../data/theme.json";

// TODO - fix context to hold state when auth fails for email/password
// as currently the component re-renders and the state is lost
// https://claude.ai/chat/a1532fde-3486-4a1f-a8d5-cefa908cb3ef

const AuthEmailPassword = ({ setLoading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    setError(""); // Clear any previous error

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    const auth = getAuth();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (__DEV__) {
        console.log("Sign in successful");
      }
      // Don't clear email and password here
    } catch (signInError) {
      // console.error("Authentication error:", signInError);

      // Map Firebase error codes to user-friendly messages
      switch (signInError.code) {
        case "auth/user-not-found":
          setError("No user found with this email address");
          break;
        case "auth/wrong-password":
          setError("Incorrect password");
          break;
        case "auth/invalid-email":
          setError("Invalid email address");
          break;
        case "auth/user-disabled":
          setError("This account has been disabled");
          break;
        default:
          setError("An error occurred during sign in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }, [email, password, setLoading]);

  const handleForgotPassword = useCallback(async () => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      setError("Check your email for instructions to reset your password.");
    } catch (error) {
      console.error("Password reset error:", error);
      setError("Failed to send password reset email. Please try again.");
    }
  }, [email]);

  return (
    <View style={styles.container}>
      {error !== "" && <Text style={styles.errorText}>{error}</Text>}

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.text}>Continue with Email</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.forgotPasswordButton}
        onPress={handleForgotPassword}
      >
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    width: "100%",
    height: 48,
    borderRadius: theme.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 18,
    borderColor: theme.colors.gray.T300,
    borderWidth: 1,
    marginBottom: 12,
  },
  button: {
    width: "100%",
    backgroundColor: theme.colors.primary,
    height: 54,
    borderRadius: theme.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 0,
    marginTop: 12,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: theme.letterSpacing.tight,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 12,
    marginBottom: 12,
  },
  forgotPasswordButton: {
    marginTop: 12,
    alignItems: "center",
  },
  forgotPasswordText: {
    color: theme.colors.primary,
    fontSize: 14,
  },
});

export default AuthEmailPassword;
