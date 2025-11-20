import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const GREEN = "#16a34a";
const LIGHT_GRAY = "#f3f4f6";
const BORDER = "#e5e7eb";
const MUTED = "#6b7280";
const BLACK = "#111827";

export default function AnalyticsScreen() {
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerRow}>
            <Text style={styles.title}>Analytics</Text>
            <View style={styles.toggle}>
              <View style={[styles.togglePill, styles.togglePillActive]}>
                <Text style={styles.toggleTextActive}>This month</Text>
              </View>
              <View style={styles.togglePill}>
                <Text style={styles.toggleText}>Last month</Text>
              </View>
            </View>
          </View>

          <Text style={styles.subtitle}>
            See how your spending is changing over time
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.summaryStrip}
          >
            <View style={styles.summaryCard}>
              <View style={styles.summaryBadgeGreen}>
                <Text style={styles.summaryBadgeGreenText}>On track</Text>
              </View>
              <Text style={styles.summaryValue}>$1,243</Text>
              <Text style={styles.summaryLabel}>Total spent</Text>
              <View style={styles.summaryTag}>
                <Text style={styles.summaryTagText}>Under budget by $57</Text>
              </View>
            </View>

            <View style={styles.summaryCard}>
              <View style={styles.summaryBadgeMuted}>
                <Text style={styles.summaryBadgeMutedText}>Daily average</Text>
              </View>
              <Text style={styles.summaryValue}>$41</Text>
              <Text style={styles.summaryLabel}>Per day</Text>
              <Text style={styles.summaryMutedSmall}>+ $3 vs last month</Text>
            </View>

            <View style={styles.summaryCard}>
              <View style={styles.summaryBadgeMuted}>
                <Text style={styles.summaryBadgeMutedText}>No spend days</Text>
              </View>
              <Text style={styles.summaryValue}>4</Text>
              <Text style={styles.summaryLabel}>Days with $0</Text>
              <Text style={[styles.summaryMutedSmall, { color: GREEN }]}>
                Nice streak
              </Text>
            </View>
          </ScrollView>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Spending trend</Text>
            <Text style={styles.sectionSubtitle}>By week</Text>
            <View style={styles.chartRow}>
              <View style={styles.chartBarContainer}>
                <View style={[styles.chartBar, { height: 40 }]} />
                <Text style={styles.chartLabel}>Week 1</Text>
              </View>
              <View style={styles.chartBarContainer}>
                <View style={[styles.chartBarActive, { height: 80 }]} />
                <Text style={styles.chartLabel}>Week 2</Text>
              </View>
              <View style={styles.chartBarContainer}>
                <View style={[styles.chartBar, { height: 60 }]} />
                <Text style={styles.chartLabel}>Week 3</Text>
              </View>
              <View style={styles.chartBarContainer}>
                <View style={[styles.chartBar, { height: 55 }]} />
                <Text style={styles.chartLabel}>Week 4</Text>
              </View>
            </View>
            <Text style={styles.chartNote}>
              Biggest spike: Week 3 (trip and eating out)
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Category insights</Text>

            <View style={styles.categoryRow}>
              <View style={styles.categoryLeft}>
                <View style={styles.categoryIconCircle}>
                  <Ionicons name="restaurant" size={16} color="white" />
                </View>
                <View>
                  <Text style={styles.categoryName}>Food</Text>
                  <Text style={styles.categorySub}>34% of your budget</Text>
                </View>
              </View>
              <View style={styles.categoryRight}>
                <Text style={styles.categoryAmount}>$414</Text>
              </View>
            </View>

            <View style={styles.categoryRow}>
              <View style={styles.categoryLeft}>
                <View style={[styles.categoryIconCircle, { backgroundColor: "#111827" }]}>
                  <Ionicons name="home" size={16} color="white" />
                </View>
                <View>
                  <Text style={styles.categoryName}>Rent</Text>
                  <Text style={styles.categorySub}>32% of your budget</Text>
                </View>
              </View>
              <View style={styles.categoryRight}>
                <Text style={styles.categoryAmount}>$800</Text>
              </View>
            </View>

            <View style={styles.categoryRow}>
              <View style={styles.categoryLeft}>
                <View style={[styles.categoryIconCircle, { backgroundColor: "#4b5563" }]}>
                  <Ionicons name="musical-notes" size={16} color="white" />
                </View>
                <View>
                  <Text style={styles.categoryName}>Entertainment</Text>
                  <Text style={styles.categorySub}>26% of your budget</Text>
                </View>
              </View>
              <View style={styles.categoryRight}>
                <Text style={styles.categoryAmount}>$104</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.viewAllRow}>
              <Text style={styles.viewAllText}>View all categories</Text>
              <Ionicons name="chevron-forward" size={16} color={MUTED} />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Highlights</Text>

            <View style={styles.highlightCard}>
              <View style={styles.highlightIconCircle}>
                <Ionicons name="albums" size={16} color={BLACK} />
              </View>
              <View style={styles.highlightContent}>
                <Text style={styles.highlightTitle}>Subscriptions creeping up</Text>
                <Text style={styles.highlightBody}>
                  You spent $45 more on subscriptions than last month. Spotify, Netflix, iCloud.
                </Text>
              </View>
            </View>

            <View style={styles.highlightCard}>
              <View style={styles.highlightIconCircle}>
                <Ionicons name="leaf" size={16} color={BLACK} />
              </View>
              <View style={styles.highlightContent}>
                <Text style={styles.highlightTitle}>Food challenge idea</Text>
                <Text style={styles.highlightBody}>
                  If you cut Food by 10 percent you could save about $40 this month.
                </Text>
              </View>
              <TouchableOpacity style={styles.challengeButton}>
                <Text style={styles.challengeButtonText}>Start challenge</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "white"
  },
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20
  },
  scroll: {
    flex: 1
  },
  scrollContent: {
    paddingBottom: 24
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: BLACK
  },
  toggle: {
    flexDirection: "row",
    backgroundColor: LIGHT_GRAY,
    borderRadius: 999,
    padding: 2
  },
  togglePill: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999
  },
  togglePillActive: {
    backgroundColor: "white"
  },
  toggleText: {
    fontSize: 12,
    color: MUTED
  },
  toggleTextActive: {
    fontSize: 12,
    fontWeight: "600",
    color: BLACK
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: MUTED
  },
  summaryStrip: {
    marginTop: 20
  },
  summaryCard: {
    width: 180,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 14,
    marginRight: 12,
    borderWidth: 1,
    borderColor: BORDER
  },
  summaryBadgeGreen: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#dcfce7",
    marginBottom: 6
  },
  summaryBadgeGreenText: {
    fontSize: 11,
    color: GREEN,
    fontWeight: "600"
  },
  summaryBadgeMuted: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: LIGHT_GRAY,
    marginBottom: 6
  },
  summaryBadgeMutedText: {
    fontSize: 11,
    color: MUTED,
    fontWeight: "500"
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: "700",
    color: BLACK
  },
  summaryLabel: {
    fontSize: 13,
    color: MUTED,
    marginTop: 2
  },
  summaryMutedSmall: {
    fontSize: 12,
    color: MUTED,
    marginTop: 8
  },
  summaryTag: {
    marginTop: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 999,
    backgroundColor: "#ecfdf3",
    alignSelf: "flex-start"
  },
  summaryTagText: {
    fontSize: 11,
    color: GREEN,
    fontWeight: "500"
  },
  section: {
    marginTop: 24
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: BLACK
  },
  sectionSubtitle: {
    fontSize: 13,
    color: MUTED,
    marginTop: 2
  },
  chartRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 14
  },
  chartBarContainer: {
    flex: 1,
    alignItems: "center"
  },
  chartBar: {
    width: 18,
    borderRadius: 8,
    backgroundColor: LIGHT_GRAY
  },
  chartBarActive: {
    width: 18,
    borderRadius: 8,
    backgroundColor: GREEN
  },
  chartLabel: {
    fontSize: 11,
    color: MUTED,
    marginTop: 6
  },
  chartNote: {
    marginTop: 8,
    fontSize: 12,
    color: MUTED
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: BORDER,
    marginTop: 10
  },
  categoryLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  categoryIconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: GREEN,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10
  },
  categoryName: {
    fontSize: 15,
    fontWeight: "600",
    color: BLACK
  },
  categorySub: {
    fontSize: 12,
    color: MUTED,
    marginTop: 2
  },
  categoryRight: {
    alignItems: "flex-end"
  },
  categoryAmount: {
    fontSize: 15,
    fontWeight: "600",
    color: BLACK
  },
  viewAllRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10
  },
  viewAllText: {
    fontSize: 13,
    color: MUTED,
    fontWeight: "500"
  },
  highlightCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: BORDER,
    backgroundColor: "white",
    marginTop: 12
  },
  highlightIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: LIGHT_GRAY,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10
  },
  highlightContent: {
    flex: 1
  },
  highlightTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: BLACK
  },
  highlightBody: {
    fontSize: 12,
    color: MUTED,
    marginTop: 4
  },
  challengeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#dcfce7",
    alignSelf: "center",
    marginLeft: 8
  },
  challengeButtonText: {
    fontSize: 12,
    color: GREEN,
    fontWeight: "600"
  }
});
