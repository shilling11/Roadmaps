import { Stack, Slot } from "expo-router";
import { SessionAuth } from "@/components/SessionAuth";

export default function RootLayout() {
  return (
    <SessionAuth>
      <Slot/>
    </SessionAuth>
  );
}