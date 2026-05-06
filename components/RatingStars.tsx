import { Text, View } from 'react-native';

interface RatingStarsProps {
  rating: number;
  maxStars?: number;
}

export default function RatingStars({
  rating,
  maxStars = 5,
}: RatingStarsProps) {
  const stars = [];

  for (let i = 1; i <= maxStars; i++) {
    stars.push(
      <Text
        key={i}
        style={{
          fontSize: 18,
          color: '#FFD700',
        }}
      >
        {i <= rating ? '★' : '☆'}
      </Text>
    );
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        marginTop: 8,
      }}
    >
      {stars}
    </View>
  );
}