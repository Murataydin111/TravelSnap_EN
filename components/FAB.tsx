import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

import { Colors } from '@/constants/Colors';

export default function FAB() {
  const router = useRouter();

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      style={[styles.container, animatedStyle]}
    >
      <Pressable
        style={styles.button}
        onPress={() =>
          router.push('/add-trip')
        }
        onPressIn={() => {
          scale.value = withSpring(0.9);
        }}
        onPressOut={() => {
          scale.value = withSpring(1);
        }}
      >
        <Ionicons
          name="add"
          size={32}
          color="white"
        />
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    zIndex: 100,
  },

  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
});