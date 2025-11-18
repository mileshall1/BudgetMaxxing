import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { colors, spacing } from "../theme";

export default function LoginScreen() {
  const handleContinue = () => {
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.bg,
        alignItems: "stretch",
      }}
    >
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.06,
          paddingTop: 120,
          paddingHorizontal: spacing.lg,
        }}
        pointerEvents="none"
      >
        {Array.from({ length: 10 }).map((_, row) => (
          <View
            key={row}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 32,
            }}
          >
            {Array.from({ length: 4 }).map((__, col) => (
              <Text
                key={col}
                style={{
                  fontSize: 32,
                  color: colors.text,
                }}
              >
                $
              </Text>
            ))}
          </View>
        ))}
      </View>

      <View
        style={{
          flex: 1,
          paddingHorizontal: spacing.lg,
          paddingTop: spacing.xl,
          paddingBottom: spacing.xl,
          justifyContent: "flex-start",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: spacing.lg,
            marginTop: spacing.lg,
          }}
        >
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 24,
              backgroundColor: "#000",
              justifyContent: "center",
              alignItems: "center",
              marginRight: spacing.md,
            }}
          >
            <MaterialCommunityIcons
              name="wallet-outline"
              size={40}
              color="#fff"
            />
          </View>
        </View>

        <View style={{ marginBottom: spacing.xl }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "400",
              color: colors.text,
              marginBottom: spacing.xs,
            }}
          >
            Welcome to{" "}
            <Text style={{ fontWeight: "700" }}>Budgetmaxxing</Text>,
          </Text>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "400",
              color: colors.text,
            }}
          >
            budgeting made easy.
          </Text>
        </View>

        <View style={{ marginTop: spacing.xl }}>
          <Text
            style={{
              fontSize: 16,
              color: colors.text,
              marginBottom: spacing.md,
            }}
          >
            Let’s get started…
          </Text>

          <TouchableOpacity
            onPress={handleContinue}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 2,
              borderColor: colors.text,
              borderRadius: 999,
              paddingVertical: spacing.md,
              backgroundColor: colors.bg,
              marginBottom: spacing.md,
            }}
          >
            <Ionicons
              name="logo-google"
              size={22}
              color={colors.text}
              style={{ marginRight: spacing.sm }}
            />
            <Text
              style={{
                fontSize: 16,
                color: colors.text,
              }}
            >
              Continue with Google
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleContinue}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 2,
              borderColor: colors.text,
              borderRadius: 999,
              paddingVertical: spacing.md,
              backgroundColor: colors.bg,
            }}
          >
            <Ionicons
              name="logo-apple"
              size={22}
              color={colors.text}
              style={{ marginRight: spacing.sm }}
            />
            <Text
              style={{
                fontSize: 16,
                color: colors.text,
              }}
            >
              Continue with Apple
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              fontSize: 14,
              color: colors.subtext,
              textAlign: "center",
              marginTop: spacing.md,
            }}
          >
            Already have an account?{" "}
            <Text style={{ textDecorationLine: "underline" }}>Login</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
