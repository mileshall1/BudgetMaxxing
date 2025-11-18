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

const categories = [
  { id: "shopping", label: "Shopping", spent: 312.21, budget: 250, icon: "bag-handle-outline" },
  { id: "transport", label: "Transportation", spent: 307.21, budget: 250, icon: "car-sport-outline" },
  { id: "food", label: "Food", spent: 250.21, budget: 250, icon: "restaurant-outline" },
];

export default function AnalyticsScreen() {
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
            marginBottom: spacing.md,
          }}
        >
          Analytics
        </Text>

        {/* Filters row */}
        <View
          style={{
            flexDirection: "row",
            marginBottom: spacing.lg,
          }}
        >
          <FilterPill label="All Categories" />
          <FilterPill label="Nov 2025" />
          <FilterPill label="Account 1" />
        </View>

        {/* Donut chart placeholder */}
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginBottom: spacing.lg,
            borderWidth: 2,
            borderColor: "#d0d0d0",
            padding: spacing.sm,
          }}
        >
          <View
            style={{
              width: 260,
              height: 260,
              borderRadius: 130,
              backgroundColor: "#000",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: 150,
                height: 150,
                borderRadius: 75,
                backgroundColor: "#D9D9D9",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: colors.text,
                  marginBottom: 4,
                }}
              >
                Total November Spending
              </Text>
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: "800",
                  color: colors.text,
                }}
              >
                $856.67
              </Text>
            </View>
          </View>
        </View>

        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            color: colors.text,
            marginBottom: spacing.sm,
          }}
        >
          124% over in your budget categories
        </Text>

        <View
          style={{
            height: 1,
            backgroundColor: "#000",
            marginBottom: spacing.md,
          }}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: spacing.sm,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              color: colors.text,
            }}
          >
            Top Spending Categories
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: colors.subtext,
            }}
          >
            Set Budget
          </Text>
        </View>

        {categories.map((cat) => {
          const progress = Math.min(cat.spent / cat.budget, 1);
          return (
            <View
              key={cat.id}
              style={{
                flexDirection: "row",
                marginBottom: spacing.md,
              }}
            >
              <View
                style={{
                  width: 32,
                  alignItems: "center",
                  marginRight: spacing.md,
                  marginTop: 4,
                }}
              >
                <Ionicons name={cat.icon} size={22} color={colors.text} />
              </View>

              <View style={{ flex: 1 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 2,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "600",
                      color: colors.text,
                    }}
                  >
                    {cat.label}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.subtext,
                    }}
                  >
                    Edit
                  </Text>
                </View>

                <Text
                  style={{
                    fontSize: 13,
                    color: colors.text,
                    marginBottom: 4,
                  }}
                >
                  ${cat.spent.toFixed(2)} of ${cat.budget.toFixed(0)}
                </Text>

                <View
                  style={{
                    height: 3,
                    backgroundColor: "#000",
                    transform: [{ skewX: "-10deg" }],
                    overflow: "hidden",
                  }}
                >
                  <View
                    style={{
                      width: `${progress * 100}%`,
                      height: "100%",
                      backgroundColor: "#000",
                    }}
                  />
                </View>
              </View>
            </View>
          );
        })}

        <TouchableOpacity
          style={{
            marginTop: spacing.lg,
            alignSelf: "flex-end",
          }}
        >
          <Text
            style={{
              fontSize: 13,
              color: colors.text,
              textDecorationLine: "underline",
            }}
          >
            View all Budget Categories
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function FilterPill({ label }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#E2E2E2",
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.sm,
        marginRight: spacing.xs,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 13,
          color: colors.text,
        }}
      >
        {label}
      </Text>
      <Ionicons name="chevron-down" size={14} color={colors.text} />
    </View>
  );
}
