import React, { useState } from "react";
import { TouchableOpacity, Text, View, StyleSheet, TextInput } from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import theme from "../../data/theme.json";

const AuthEmailPassword = ({ setLoading }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setError("");
    const auth = getAuth();

    try {
      // First, try to sign in
      await signInWithEmailAndPassword(auth, email, password);
      if (__DEV__) {
        console.log("Sign in successful");
      }
    } catch (signInError) {
      // If sign in fails, try to create a new account
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        if (__DEV__) {
          console.log("Sign up successful");
        }
      } catch (signUpError) {
        // Handle specific error cases
        if (signUpError.code === "auth/email-already-in-use") {
          setError("Incorrect password for existing account");
        } else {
          setError("Authentication failed. Please try again.");
        }
        console.error("Authentication error:", signUpError.message);
      } finally {
        setLoading(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        "Password Reset Email Sent",
        "Check your email for instructions to reset your password."
      );
    } catch (error) {
      console.error("Password reset error:", error);
      setError("Failed to send password reset email. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

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
