import { useState } from 'react';
import { Pressable } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSequence,
    withSpring,
} from 'react-native-reanimated';

import { Colors } from '../constants/Colors';

export default function LikeButton() {
  const [liked, setLiked] = useState(false);

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    setLiked((prev) => !prev);

    scale.value = withSequence(
      withSpring(1.4),
      withSpring(1)
    );
  };

  return (
    <Pressable onPress={handlePress}>
      <Animated.View style={animatedStyle}>
        <Ionicons
          name={liked ? 'heart' : 'heart-outline'}
          size={48}
          color={Colors.accent}
        />
      </Animated.View>
    </Pressable>
  );
}