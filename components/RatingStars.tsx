import { StyleSheet, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../constants/Colors';

interface RatingStarsProps {
  rating: number;
}

export default function RatingStars({
  rating,
}: RatingStarsProps) {
  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Ionicons
          key={star}
          name={
            star <= rating
              ? 'star'
              : 'star-outline'
          }
          size={16}
          color={Colors.accent}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',

    gap: 4,
  },
});