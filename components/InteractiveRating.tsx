import { Ionicons } from '@expo/vector-icons';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';

import {
    runOnJS,
} from 'react-native-reanimated';

import {
    Gesture,
    GestureDetector,
} from 'react-native-gesture-handler';

import { Colors } from '../constants/Colors';

interface InteractiveRatingProps {
  rating: number;
  onChange: (rating: number) => void;
}

export default function InteractiveRating({
  rating,
  onChange,
}: InteractiveRatingProps) {
  let containerWidth = 0;

  const onLayout = (
    event: LayoutChangeEvent
  ) => {
    containerWidth =
      event.nativeEvent.layout.width;
  };

  const updateRating = (x: number) => {
    if (containerWidth === 0) {
      return;
    }

    const starWidth =
      containerWidth / 5;

    const newRating = Math.min(
      5,
      Math.max(
        1,
        Math.ceil(x / starWidth)
      )
    );

    onChange(newRating);
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      runOnJS(updateRating)(
        event.x
      );
    });

  return (
    <GestureDetector gesture={panGesture}>
      <View
        style={styles.container}
        onLayout={onLayout}
      >
        {[1, 2, 3, 4, 5].map(
          (star) => (
            <Ionicons
              key={star}
              name={
                star <= rating
                  ? 'star'
                  : 'star-outline'
              }
              size={32}
              color={Colors.accent}
            />
          )
        )}
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});