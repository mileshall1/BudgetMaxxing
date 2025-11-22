// app/_layout.tsx
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "../src/auth-context";

function RootNavigation() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading || segments.length === 0) return;

    const inAuthGroup =
      segments?.[0] === "(auth)" || segments?.[0] === "auth";

    if (!user && !inAuthGroup) {
      // not logged in → always go to login screen
      router.replace("/(auth)/login");
    } else if (user && inAuthGroup) {
      // logged in but in auth group → go to tabs root (Home = (tabs)/index.tsx)
      router.replace("/(tabs)");
    }
  }, [user, loading, segments, router]);

  return <Slot />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigation />
    </AuthProvider>
  );
}
