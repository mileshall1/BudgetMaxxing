import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing } from "../theme";

export default function UserScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.bg,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: spacing.lg,
          paddingTop: spacing.lg + 12, // more space under status bar
          paddingBottom: spacing.xl,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Top profile row */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: spacing.xl,
          }}
        >
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: 32,
              backgroundColor: "#222",
              justifyContent: "center",
              alignItems: "center",
              marginRight: spacing.md,
            }}
          >
            <Ionicons name="person" size={36} color="#fff" />
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
                color: colors.text,
              }}
            >
              First Last
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: colors.subtext,
                marginTop: 2,
              }}
            >
              first.last@email.com
            </Text>
          </View>

          <TouchableOpacity
            style={{
              paddingVertical: 6,
              paddingHorizontal: 14,
              borderRadius: 999,
              backgroundColor: "#E0E0E0",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: colors.text,
              }}
            >
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>

        {/* Account details section */}
        <Text
          style={{
            fontSize: 16,
            fontWeight: "700",
            color: colors.text,
            marginBottom: spacing.sm,
          }}
        >
          Account Details
        </Text>

        <UserRow label="Bank Accounts" />
        <UserRow label="Statements" />
        <UserRow label="Goals & Budgets" />

        <TouchableOpacity style={{ marginTop: spacing.lg }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#C02727",
            }}
          >
            Log Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function UserRow({ label, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: spacing.sm,
      }}
    >
      <Text
        style={{
          fontSize: 15,
          color: colors.subtext,
        }}
      >
        {label}
      </Text>
      <Ionicons name="chevron-forward" size={18} color={colors.subtext} />
    </TouchableOpacity>
  );
}
