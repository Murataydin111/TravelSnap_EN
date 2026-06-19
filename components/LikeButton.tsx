import { useState } from 'react';
import { Pressable } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import Animated, {
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

export default function LikeButton() {
  const [liked, setLiked] = useState(false);

  const scale = useSharedValue(1);
  const progress = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      progress.value,
      [0, 1],
      ['#808080', '#FF3B30']
    ),
  }));

  const handlePress = () => {
    const nextLiked = !liked;

    setLiked(nextLiked);

    progress.value = withTiming(
      nextLiked ? 1 : 0,
      { duration: 300 }
    );

    scale.value = withSequence(
      withSpring(1.4),
      withSpring(1)
    );
  };

  const AnimatedIonicons =
    Animated.createAnimatedComponent(Ionicons);

  return (
    <Pressable onPress={handlePress}>
      <Animated.View style={animatedStyle}>
        <AnimatedIonicons
          name={liked ? 'heart' : 'heart-outline'}
          size={48}
          style={iconStyle}
        />
      </Animated.View>
    </Pressable>
  );
}