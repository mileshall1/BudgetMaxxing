// app/(auth)/login.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { Platform } from "react-native";
import { useAuth } from "../../src/auth-context";
import { supabase } from "../../supabaseClient";
import { colors, spacing } from "../../src/theme";

WebBrowser.maybeCompleteAuthSession();

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

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialProvider, setSocialProvider] = useState<"google" | "apple" | null>(null);

  async function handleLogin() {
    if (!email.trim() || !password) {
      Alert.alert("Missing info", "Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      await signIn(email.trim(), password);
      // Root layout will redirect to /(tabs)
    } catch (err: any) {
      Alert.alert("Login failed", err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleSocialLogin(provider: "google" | "apple") {
    try {
      setSocialProvider(provider);
      const redirectTo =
        Platform.OS === "web" && typeof window !== "undefined"
          ? `${window.location.origin}/auth/callback`
          : Linking.createURL("/auth/callback");

      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo },
      });

      if (error) {
        Alert.alert("Login failed", error.message);
      }
    } catch (err: any) {
      Alert.alert("Login failed", err.message || "Something went wrong");
    } finally {
      setSocialProvider(null);
    }
  }

  return (
    <SafeAreaView style={styles.root}>
      <BackgroundDollarPattern />

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View style={styles.logoBox}>
            <Image
            source={require('../../assets/images/logo.png')}
            style={{ width: 300, height: 200, marginBottom: 4, resizeMode: 'contain' }}
            />
          </View>
        </View>

        <View style={styles.titleBlock}>
          <Text style={styles.titleText}>
            Welcome to{" "}
            <Text style={styles.titleBold}>Budgetmaxxing</Text>,
          </Text>
          <Text style={styles.titleText}>budgeting made easy.</Text>
        </View>

        <View style={styles.inputBlock}>
          <Text style={styles.smallLabel}>Log in to continue</Text>

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

          <TouchableOpacity
            onPress={handleLogin}
            disabled={loading}
            style={[
              styles.primaryButton,
              loading && { opacity: 0.8 },
            ]}
          >
            <Text style={styles.primaryButtonText}>
              {loading ? "Logging in..." : "Log in"}
            </Text>
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={{ gap: spacing.sm }}>
            <TouchableOpacity
              style={[
                styles.socialButton,
                socialProvider === "google" && { opacity: 0.75 },
              ]}
              onPress={() => handleSocialLogin("google")}
              disabled={!!socialProvider}
            >
              <Ionicons
                name="logo-google"
                size={20}
                color={colors.text}
                style={{ marginRight: spacing.sm }}
              />
              <Text style={styles.socialText}>
                {socialProvider === "google" ? "Opening Google..." : "Continue with Google"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.socialButton,
                socialProvider === "apple" && { opacity: 0.75 },
              ]}
              onPress={() => handleSocialLogin("apple")}
              disabled={!!socialProvider}
            >
              <Ionicons
                name="logo-apple"
                size={20}
                color={colors.text}
                style={{ marginRight: spacing.sm }}
              />
              <Text style={styles.socialText}>
                {socialProvider === "apple" ? "Opening Apple..." : "Continue with Apple"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>New here?</Text>
            <Link
              href="/(auth)/signup"
              style={styles.footerLink}
            >
              Sign up
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
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  titleBlock: {
    marginBottom: spacing.xl,
  },
  titleText: {
    fontSize: 22,
    fontWeight: "400",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  titleBold: {
    fontWeight: "700",
  },
  inputBlock: {
    marginTop: spacing.xl,
  },
  smallLabel: {
    fontSize: 16,
    color: colors.text,
    marginBottom: spacing.md,
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
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.subtext,
    opacity: 0.4,
  },
  dividerText: {
    marginHorizontal: spacing.sm,
    fontSize: 12,
    color: colors.subtext,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.text,
    borderRadius: 999,
    paddingVertical: spacing.md,
    backgroundColor: colors.bg,
  },
  socialText: {
    fontSize: 16,
    color: colors.text,
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
