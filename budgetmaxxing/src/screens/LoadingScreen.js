import {React, useEffect} from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Redirect, router } from "expo-router";
import { colors, spacing } from "../theme";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withSpring,
  withRepeat,
} from "react-native-reanimated";

export default function LoadingScreen() {

    const translateY = useSharedValue(0);
    const scaleX = useSharedValue(1);
    const scaleY = useSharedValue(1);
    const handleContinue = () => {
        router.replace("/(tabs)");
  };

    useEffect(() => {
    const timeout = setTimeout(() => {
        router.replace("/(tabs)");
    }, 2000); // # this makes the loading screen loop for 2 sec

    return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
    // bounce movement (translateY)
    translateY.value = withRepeat(
        withSequence(
            withTiming(20, { duration: 150 }),      // drop down anim
            withSpring(-10),                        // bounce up anim
            withSpring(0)                           // settle anim
        ),
        -1,   // this makes the animation infinite
        true
    );

    // squash/stretch Y
    scaleY.value = withRepeat(
        withSequence(
            withTiming(0.85, { duration: 150 }),    // squash anim
            withTiming(1.1, { duration: 150 }),     // stretch anim
            withSpring(1)                           // settle anim
        ),
        -1,   // this makes the animation infinite
        true
    );

    // squash/stretch X
    scaleX.value = withRepeat(
        withSequence(
            withTiming(1.1, { duration: 150 }),     // widen anim
            withTiming(0.95, { duration: 150 }),    // narrow anim
            withSpring(1)                           // settle anim
        ),
        -1,   // this makes the animation infinite
        true
    );
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
    return {
        transform: [
        { translateY: translateY.value },
        { scaleX: scaleX.value },
        { scaleY: scaleY.value },
        ],
    };
    });

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
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Animated.View style={animatedStyle}>
            <Image
            source={require('../../assets/images/logo.png')}
            style={{ width: 300, height: 200, marginBottom: spacing.lg }}
            />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}