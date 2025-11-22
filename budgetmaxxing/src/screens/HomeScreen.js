import React from "react";
import { ScrollView, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors, spacing } from "../theme";

const categories = [
  { id: "food", label: "Food", amount: 314, icon: "restaurant" },
  { id: "rent", label: "Rent", amount: 800, icon: "home" },
  { id: "transport", label: "Transport", amount: 92, icon: "car-sport" },
  { id: "entertain", label: "Entertain", amount: 104, icon: "sparkles-outline" },
];

const transactions = [
  { id: "1", label: "Chipotle", date: "Jan 12", amount: -14.87, icon: "car" },
  { id: "2", label: "Uber", date: "Jan 11", amount: -21.3, icon: "credit-card" },
  { id: "3", label: "Paycheck", date: "Jan 10", amount: 825, icon: "cash-multiple" },
];

export default function HomeScreen() {
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
            fontSize: 24,
            fontWeight: "700",
            color: colors.text,
            marginBottom: spacing.xs,
          }}
        >
          Hello, user
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: colors.subtext,
            marginBottom: spacing.lg,
          }}
        >
          Here’s your financial snapshot
        </Text>

        <View
          style={{
            backgroundColor: "#F9F9F9",
            borderRadius: 24,
            padding: spacing.lg,
            marginBottom: spacing.lg,
          }}
        >
          <Text style={{ fontSize: 14, color: colors.subtext, marginBottom: 4 }}>
            This Month
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: spacing.sm,
            }}
          >
            <Text
              style={{
                fontSize: 30,
                fontWeight: "800",
                color: colors.text,
              }}
            >
              $1,243 spent
            </Text>
            <Ionicons name="stats-chart" size={28} color={colors.text} />
          </View>
          <Text style={{ fontSize: 14, color: "#1A9B4E" }}>
            +12%{" "}
            <Text style={{ color: colors.subtext }}>from last month</Text>
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            marginBottom: spacing.lg,
          }}
        >
          {categories.map((item) => (
            <View
              key={item.id}
              style={{
                width: "48%",
                backgroundColor: "#F9F9F9",
                borderRadius: 24,
                paddingVertical: spacing.md,
                paddingHorizontal: spacing.md,
                marginBottom: spacing.md,
              }}
            >
              <View
                style={{
                  marginBottom: spacing.sm,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                {item.icon === "sparkles-outline" ? (
                  <Ionicons
                    name={item.icon}
                    size={18}
                    color={colors.text}
                  />
                ) : (
                  <Ionicons
                    name={item.icon}
                    size={18}
                    color={colors.text}
                  />
                )}
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "600",
                    color: colors.text,
                  }}
                >
                  {item.label}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "700",
                  color: colors.text,
                }}
              >
                ${item.amount}
              </Text>
            </View>
          ))}
        </View>

        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            color: colors.text,
            marginBottom: spacing.sm,
          }}
        >
          Recent transactions
        </Text>

        <View
          style={{
            backgroundColor: "#F9F9F9",
            borderRadius: 24,
            paddingHorizontal: spacing.md,
            paddingVertical: spacing.xs,
          }}
        >
          {transactions.map((tx, index) => (
            <View
              key={tx.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: spacing.md,
                borderBottomWidth: index === transactions.length - 1 ? 0 : 1,
                borderBottomColor: "#EFEFEF",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 12,
                    borderWidth: 1,
                    borderColor: colors.text,
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: spacing.sm,
                  }}
                >
                  {tx.icon === "cash-multiple" ? (
                    <MaterialCommunityIcons
                      name={tx.icon}
                      size={18}
                      color={colors.text}
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name={tx.icon}
                      size={18}
                      color={colors.text}
                    />
                  )}
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "600",
                      color: colors.text,
                    }}
                  >
                    {tx.label}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      color: colors.subtext,
                    }}
                  >
                    {tx.date}
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "600",
                  color: tx.amount >= 0 ? "#1A9B4E" : colors.text,
                }}
              >
                {tx.amount >= 0 ? "+" : "-"}${Math.abs(tx.amount).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
