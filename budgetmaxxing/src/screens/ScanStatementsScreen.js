import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ScanStatementsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan Statements</Text>

      <Image
        source={{
          uri: "https://i.ibb.co/zPD7dx6/bank-statement-scan.png", // You can replace with local image in assets
        }}
        style={styles.statementImage}
        resizeMode="contain"
      />

      <Text style={styles.subtitle}>Align the statement to scan</Text>

      <TouchableOpacity style={styles.cameraButton}>
        <Ionicons name="camera-outline" size={32} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    paddingTop: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 30,
    color: "#000",
  },
  statementImage: {
    width: 260,
    height: 260,
    marginBottom: 25,
    borderRadius: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 40,
  },
  cameraButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#F8F8F8",
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
});
