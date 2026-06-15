import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';

import { Colors } from '../constants/Colors';

export default function SkeletonCard() {
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(1, {
        duration: 900,
      }),
      -1,
      true
    );
  }, []);

  const animatedStyle =
    useAnimatedStyle(() => ({
      opacity: opacity.value,
    }));

  return (
    <Animated.View
      style={[
        styles.card,
        animatedStyle,
      ]}
    >
      <View style={styles.image} />
      <View style={styles.title} />
      <View style={styles.subtitle} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },

  image: {
    height: 180,
    borderRadius: 12,
    backgroundColor: '#2d3d5f',
    marginBottom: 16,
  },

  title: {
    height: 20,
    width: '70%',
    backgroundColor: '#2d3d5f',
    borderRadius: 6,
    marginBottom: 10,
  },

  subtitle: {
    height: 14,
    width: '45%',
    backgroundColor: '#2d3d5f',
    borderRadius: 6,
  },
});