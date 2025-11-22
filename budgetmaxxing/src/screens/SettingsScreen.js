import React, { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing } from "../theme";

export default function SettingsScreen() {
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [darkTheme, setDarkTheme] = useState(false);
  const [passcodeEnabled, setPasscodeEnabled] = useState(true);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: spacing.lg,
          paddingTop: spacing.xl,
          paddingBottom: spacing.xl,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "700",
            color: colors.text,
            marginBottom: spacing.md,
          }}
        >
          Settings
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#F4F4F4",
            borderRadius: 999,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.sm,
            marginBottom: spacing.lg,
          }}
        >
          <Ionicons name="search" size={18} color={colors.subtext} />
          <Text
            style={{
              marginLeft: spacing.sm,
              color: colors.subtext,
              fontSize: 14,
            }}
          >
            Search
          </Text>
        </View>

        <SectionHeading label="Financial Connections" />
        <SettingRow label="Bank Accounts" />
        <SettingRow label="Upload Bank Statements" />

        <SectionHeading label="Budget & Tracking" />
        <SettingRow label="Monthly Budget" />
        <SettingRowSwitch
          label="Alerts & Notifications"
          value={alertsEnabled}
          onValueChange={setAlertsEnabled}
        />
        <SettingRow label="Savings Goals" />

        <SectionHeading label="Appearance" />
        <SettingRowSwitch
          label="Theme"
          value={darkTheme}
          onValueChange={setDarkTheme}
        />

        <SectionHeading label="Security" />
        <SettingRowSwitch
          label="App Passcode / Face ID"
          value={passcodeEnabled}
          onValueChange={setPasscodeEnabled}
        />
        <SettingRow label="Two-Factor Authentication" />
        <SettingRow label="Linked Sign-In Methods" />

        <SectionHeading label="Data & Storage" />
        <SettingRowValue label="Version" value="1.0.0" />
        <SettingRowTwoLabels
          leftLabel="Privacy Policy"
          rightLabel="Terms of Service"
        />
        <SettingRow label="Contact Support" />
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionHeading({ label }) {
  return (
    <Text
      style={{
        fontSize: 16,
        fontWeight: "700",
        color: colors.text,
        marginTop: spacing.lg,
        marginBottom: spacing.xs,
      }}
    >
      {label}
    </Text>
  );
}

function SettingRow({ label, onPress }) {
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
      <Text style={{ fontSize: 15, color: colors.subtext }}>{label}</Text>
      <Ionicons name="chevron-forward" size={18} color={colors.subtext} />
    </TouchableOpacity>
  );
}

function SettingRowSwitch({ label, value, onValueChange }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: spacing.sm,
      }}
    >
      <Text style={{ fontSize: 15, color: colors.subtext }}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#E4E4E4", true: "#000000" }}
        thumbColor="#FFFFFF"
      />
    </View>
  );
}

function SettingRowValue({ label, value }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: spacing.sm,
      }}
    >
      <Text style={{ fontSize: 15, color: colors.subtext }}>{label}</Text>
      <Text style={{ fontSize: 15, color: colors.subtext }}>{value}</Text>
    </View>
  );
}

function SettingRowTwoLabels({ leftLabel, rightLabel }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: spacing.sm,
      }}
    >
      <Text style={{ fontSize: 15, color: colors.subtext }}>{leftLabel}</Text>
      <Text style={{ fontSize: 15, color: colors.subtext }}>{rightLabel}</Text>
    </View>
  );
}
