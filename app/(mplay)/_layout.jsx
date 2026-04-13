import { Stack } from 'expo-router'

export function _layout() {

    return (
      <Stack>
        <Stack.Screen name="index" options={{headerShown:false}}></Stack.Screen>
      </Stack>
    )
  
}

export default _layout