import { Stack } from "expo-router";

export function _layout() {
  return (
    // <Context>
    <Stack>
      <Stack.Screen
        name="audio"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
    // </Context>
  );
}

export default _layout;
