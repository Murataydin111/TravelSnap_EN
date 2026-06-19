import React from 'react';
import { Pressable } from 'react-native';

import Animated, {
  FadeInDown,
  FadeOutLeft,
  LinearTransition,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import {
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';

interface AnimatedTripCardProps {
  children: React.ReactNode;
  index: number;
  onDelete?: () => void;
}

export default function AnimatedTripCard({
  children,
  index,
  onDelete,
}: AnimatedTripCardProps) {
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationX < 0) {
        translateX.value = event.translationX;
      }
    })
    .onEnd(() => {
      if (translateX.value < -120) {
        translateX.value = withTiming(
          -500,
          { duration: 250 },
          (finished) => {
            if (finished && onDelete) {
              runOnJS(onDelete)();
            }
          }
        );
      } else {
        translateX.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { scale: scale.value },
    ],
  }));

  return (
    <GestureDetector gesture={panGesture}>
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
          exiting={FadeOutLeft.springify()}
          layout={LinearTransition.springify()}
          style={animatedStyle}
        >
          {children}
        </Animated.View>
      </Pressable>
    </GestureDetector>
  );
}