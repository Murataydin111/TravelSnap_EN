import { Stack } from 'expo-router';

import { Colors } from '../constants/Colors';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.background,
        },

        headerTintColor: Colors.primary,

        contentStyle: {
          backgroundColor: Colors.background,
        },
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="trip/[id]"
        options={{
          title: 'Trip Details',
          animation: 'slide_from_right',
        }}
      />
    </Stack>
  );
}