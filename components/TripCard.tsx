import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import RatingStars from './RatingStars';

interface TripCardProps {
  title: string;
  destination: string;
  date: string;
  rating: number;
}

export default function TripCard({
  title,
  destination,
  date,
  rating,
}: TripCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.meta}>
        {destination} | {date}
      </Text>

      <RatingStars rating={rating} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a2e',
  },

  meta: {
    marginTop: 6,
    color: 'gray',
  },
});