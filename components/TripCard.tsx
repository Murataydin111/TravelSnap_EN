import { Pressable, StyleSheet, Text, View } from 'react-native';
import RatingStars from './RatingStars';

interface TripCardProps {
  title: string;
  destination: string;
  date: string;
  rating: number;
  onDelete?: () => void;
}

export default function TripCard({
  title,
  destination,
  date,
  rating,
  onDelete,
}: TripCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.info}>
        {destination} | {date}
      </Text>

      <RatingStars rating={rating} />

      {onDelete && (
        <Pressable onPress={onDelete}>
          <Text style={styles.delete}>Delete</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  info: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 10,
  },

  delete: {
    color: 'red',
    marginTop: 10,
    fontWeight: 'bold',
  },
});