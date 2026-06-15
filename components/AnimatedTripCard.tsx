import React from 'react';
import { Pressable } from 'react-native';

import Animated, {
    FadeInDown,
    Layout,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

interface AnimatedTripCardProps {
  children: React.ReactNode;
  index: number;
}

export default function AnimatedTripCard({
  children,
  index,
}: AnimatedTripCardProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Pressable
      onPressIn={() => {
        scale.value = withSpring(0.97);
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
      }}
    >
      <Animated.View
        entering={FadeInDown
          .delay(index * 80)
          .springify()}
        layout={Layout.springify()}
        style={animatedStyle}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
}