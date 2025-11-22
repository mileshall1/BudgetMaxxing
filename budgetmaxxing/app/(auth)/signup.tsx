// app/(auth)/signup.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { supabase } from "../../supabaseClient";
import { colors, spacing } from "../../src/theme";


function BackgroundDollarPattern() {
  return (
    <View style={styles.backgroundPattern}>
      {Array.from({ length: 10 }).map((_, row) => (
        <View key={row} style={styles.backgroundRow}>
          {Array.from({ length: 4 }).map((__, col) => (
            <Text key={col} style={styles.backgroundDollar}>
              $
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
}

export default function SignupScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    if (!email.trim() || !password || !confirm) {
      Alert.alert("Missing info", "Please fill out all fields.");
      return;
    }
    if (password !== confirm) {
      Alert.alert("Passwords do not match", "Make sure both passwords match.");
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      });

      if (error) {
        Alert.alert("Sign up failed", error.message);
        return;
      }

      Alert.alert(
        "Check your email",
        "Confirm your email to finish signing up, then log in to continue.",
        [
          {
            text: "Go to login",
            onPress: () => router.replace("/(auth)/login"),
          },
        ]
      );
      // Always send them to login after sign-up.
      router.replace("/(auth)/login");
    } catch (err: any) {
      Alert.alert("Sign up failed", err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.root}>
      <BackgroundDollarPattern />

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={styles.logoBox}>
            <MaterialCommunityIcons
              name="wallet-outline"
              size={40}
              color="#fff"
            />
          </View>
        </View>

        <View style={styles.titleBlock}>
          <Text style={styles.titleText}>Create your account</Text>
          <Text style={styles.subtitleText}>
            Join Budgetmaxxing and start tracking.
          </Text>
        </View>

        <View style={styles.inputBlock}>
          <TextInput
            placeholder="Email"
            placeholderTextColor={colors.subtext}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor={colors.subtext}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />

          <TextInput
            placeholder="Confirm password"
            placeholderTextColor={colors.subtext}
            value={confirm}
            onChangeText={setConfirm}
            secureTextEntry
            style={styles.input}
          />

          <TouchableOpacity
            onPress={handleSignup}
            disabled={loading}
            style={[
              styles.primaryButton,
              loading && { opacity: 0.8 },
            ]}
          >
            <Text style={styles.primaryButtonText}>
              {loading ? "Creating account..." : "Sign up"}
            </Text>
          </TouchableOpacity>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <Link
              href="/(auth)/login"
              style={styles.footerLink}
            >
              Log in
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: "stretch",
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
    justifyContent: "flex-start",
  },
  backgroundPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.06,
    paddingTop: 120,
    paddingHorizontal: spacing.lg,
    pointerEvents: "none",
  },
  backgroundRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  backgroundDollar: {
    fontSize: 32,
    color: colors.text,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.lg,
    marginTop: spacing.lg,
  },
  logoBox: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  titleBlock: {
    marginBottom: spacing.xl,
  },
  titleText: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitleText: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.subtext,
  },
  inputBlock: {
    marginTop: spacing.xl,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.text,
    borderRadius: 16,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 15,
    color: colors.text,
    marginBottom: spacing.sm,
    backgroundColor: colors.bg,
  },
  primaryButton: {
    marginTop: spacing.sm,
    borderRadius: 999,
    paddingVertical: spacing.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
  primaryButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: spacing.md,
  },
  footerText: {
    fontSize: 14,
    color: colors.subtext,
  },
  footerLink: {
    fontSize: 14,
    color: colors.text,
    fontWeight: "600",
    marginLeft: 6,
    textDecorationLine: "underline",
  },
});
