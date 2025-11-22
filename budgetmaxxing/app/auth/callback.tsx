import { useEffect } from "react";
import { ActivityIndicator, SafeAreaView, Text } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { supabase } from "../../supabaseClient";
import { colors } from "../../src/theme";

export default function AuthCallback() {
  const params = useLocalSearchParams<{
    code?: string | string[];
    error?: string | string[];
    access_token?: string | string[];
    refresh_token?: string | string[];
  }>();
  const { code, error, access_token, refresh_token } = params;
  const router = useRouter();

  function getHashTokens() {
    if (typeof window === "undefined") return {};
    const hash = window.location.hash?.replace(/^#/, "") || "";
    const search = new URLSearchParams(hash);
    return {
      code: search.get("code") || undefined,
      access_token: search.get("access_token") || undefined,
      refresh_token: search.get("refresh_token") || undefined,
      error: search.get("error") || undefined,
    };
  }

  useEffect(() => {
    // Short-circuit to login if nothing arrives after a few seconds to avoid an infinite spinner.
    const failTimer = setTimeout(() => {
      const hashTokens = getHashTokens();
      if (
        !code &&
        !access_token &&
        !refresh_token &&
        !hashTokens.code &&
        !hashTokens.access_token &&
        !hashTokens.refresh_token
      ) {
        console.warn("OAuth callback: no params received, returning to login.");
        router.replace("/(auth)/login");
      }
    }, 5000);

    async function exchangeCode() {
      const hashTokens = getHashTokens();
      const combinedError = error || hashTokens.error;
      if (combinedError) {
        console.error("OAuth error", combinedError);
        router.replace("/(auth)/login");
        return;
      }

      const authCode =
        (Array.isArray(code) ? code[0] : code) || hashTokens.code || undefined;
      const accessToken =
        (Array.isArray(access_token) ? access_token[0] : access_token) ||
        hashTokens.access_token ||
        undefined;
      const refreshToken =
        (Array.isArray(refresh_token) ? refresh_token[0] : refresh_token) ||
        hashTokens.refresh_token ||
        undefined;

      // No params yet — wait for them to arrive.
      if (!authCode && !(accessToken && refreshToken)) {
        return;
      }

      try {
        if (authCode) {
          console.log("OAuth callback: exchanging code");
          const { error: exchangeError } =
            await supabase.auth.exchangeCodeForSession(authCode);
          if (exchangeError) {
            throw exchangeError;
          }
        } else if (typeof window !== "undefined") {
          // On web, let supabase parse and set the session from the URL/hash.
          const { error: urlError } = await supabase.auth.getSessionFromUrl({
            storeSession: true,
          });
          if (urlError) {
            throw urlError;
          }
        } else if (accessToken && refreshToken) {
          console.log("OAuth callback: setting session from tokens");
          const { error: setError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (setError) {
            throw setError;
          }
        }
      } catch (exchangeErr) {
        console.error("OAuth exchange failed", exchangeErr);
        router.replace("/(auth)/login");
        return;
      }

      // auth listener in layout will push us into the app
      router.replace("/(tabs)");
    }

    exchangeCode();
    return () => clearTimeout(failTimer);
  }, [code, error, access_token, refresh_token, router]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.bg,
      }}
    >
      <ActivityIndicator size="large" color={colors.text} />
      <Text style={{ marginTop: 12, color: colors.text }}>Signing you in…</Text>
    </SafeAreaView>
  );
}
